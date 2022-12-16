import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { ICustomContext } from 'common/models/interfaces/custom-context.interface';
import { compare, hash } from 'common/utils/password.util';
import { GqlHttpException } from 'common/errors/errors';
import JwtTokenService from '../services/jwt-token.service';
import { ValidateSchemas } from 'common/decorators';
import { LoginInputType } from '../models/inputs/login-input.type';
import { HttpStatus } from 'common/models/enums';
import { RegisterInputType } from '../models/inputs/register-input.type';
import { ThirdPartyAuthInputType } from '../models/inputs/third-party-input.type';
import { AuthMutationType, AuthRootResolver } from './auth-root.resolver';
import { User } from '../../user/models/user.model';
import { RegisterResultsType } from '../models/results/register-results.type';
import { LoginResultsType } from '../models/results/login-results.type';
import { LogoutResultsType } from '../models/results/logout-results.type';
import { ConfirmRegistrationResultsType } from '../models/results/confirm-registration-results.type';
import { LoginOrRegisterThirdPartyResultsType } from '../models/results/login-or-register-third-party-results.type';
import { ThirdPartyAuth } from '../../../common/models/enums';
import * as crypto from 'crypto';

@Resolver(AuthMutationType)
export class AuthMutationResolver extends AuthRootResolver {
    constructor() {
        super();
    }

    private makeUniqueUsername(id: string, prefix: ThirdPartyAuth): string {
        const charSum = prefix.split('').reduce((acc, val) => {
            return acc + val.charCodeAt(0);
        }, 0);

        return `${id}User${charSum}`;
    }

    @FieldResolver(() => RegisterResultsType)
    @ValidateSchemas()
    async register(
        @Args() args: RegisterInputType,
    ): Promise<RegisterResultsType> {
        const user = await this.userService.findUserByEmailOrUsername(
            args.email,
            args.username,
        );

        if (user) {
            if (user.username === args.username)
                throw new GqlHttpException(
                    'USERNAME_TAKEN',
                    HttpStatus.BAD_REQUEST,
                    'Auth Errors',
                );

            if (user.email === args.email)
                throw new GqlHttpException(
                    'EMAIL_TAKEN',
                    HttpStatus.BAD_REQUEST,
                    'Auth Errors',
                );

            return { success: false };
        }

        const code = crypto.randomUUID();

        await this.authService.setRegisterConfirmation(code, args);

        // Sending email
        const info = await this.mailer.sendConfirmationMail({
            receiverEmail: args.email,
            code,
        });
        console.log(this.mailer.previewUrl(info));
        return { success: true };
    }

    @FieldResolver(() => ConfirmRegistrationResultsType)
    async confirmRegistration(
        @Arg('code') code: string,
    ): Promise<ConfirmRegistrationResultsType> {
        const registerInput = await this.authService.getRegisterConfirmation(
            code,
        );

        if (!registerInput)
            throw new GqlHttpException(
                'CODE_NOT_FOUND',
                HttpStatus.NOT_FOUND,
                'Auth Errors',
            );

        await this.authService.deleteRegisterConfirmation(code);

        const { email, password, username } = registerInput;

        const user = await this.userService.findUserByEmailOrUsername(
            email,
            username,
        );

        if (user) {
            if (user.username === username)
                throw new GqlHttpException(
                    'USERNAME_TAKEN',
                    HttpStatus.BAD_REQUEST,
                    'Auth Errors',
                );

            if (user.email === email)
                throw new GqlHttpException(
                    'EMAIL_TAKEN',
                    HttpStatus.BAD_REQUEST,
                    'Auth Errors',
                );

            return { success: false };
        }

        const hashedPassword = await hash(password);
        await this.userService.createUser({
            email,
            password: hashedPassword,
            username,
        });

        return { success: true };
    }

    @FieldResolver(() => LoginResultsType)
    async login(
        @Args() args: LoginInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<LoginResultsType> {
        const user = await this.userService.findUserByUsername(args.username);

        if (!user || !(await compare(args.password, user.pass_hash || '')))
            throw new GqlHttpException(
                'INVALID_CREDENTIALS',
                HttpStatus.BAD_REQUEST,
                'Auth Errors',
            );

        const session = await this.authService.createSiteAuthSession({
            agent: ctx.request.headers['user-agent'] || '',
            ip: ctx.request.socket.remoteAddress || '', // TODO: recheck
            active: true,
            userId: user.id,
        });

        const accessToken = JwtTokenService.makeAccessToken({
            uid: user.id,
            sessionId: session.id,
        });

        JwtTokenService.setCookieAccessToken(ctx, accessToken);

        return {
            success: true,
            user: user as User,
        };
    }

    @FieldResolver(() => LogoutResultsType)
    async logout(@Ctx() ctx: ICustomContext): Promise<LogoutResultsType> {
        const { userJwtPayload } = ctx;
        // rewrite decorator

        if (!userJwtPayload)
            throw new GqlHttpException(
                'INVALID_SESSION',
                HttpStatus.BAD_REQUEST,
                'Auth Errors',
            );

        const session = this.authService.updateSiteAuthSession(
            userJwtPayload.sessionId,
            {
                active: false,
            },
        );

        JwtTokenService.removeCookieAccessToken(ctx);

        if (!session)
            throw new GqlHttpException(
                'INVALID_SESSION',
                HttpStatus.BAD_REQUEST,
                'Auth Errors',
            );

        return { success: true };
    }

    @FieldResolver(() => LoginOrRegisterThirdPartyResultsType)
    async loginOrRegisterThirdParty(
        @Arg('code', () => String) code: string,
        @Args() args: ThirdPartyAuthInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<LoginOrRegisterThirdPartyResultsType> {
        const facebookUser = await this.facebookStrategy.getAccountData(code);
        let user = (await this.userService.findUserByThirdPartyAuth(
            facebookUser.id,
            ThirdPartyAuth.FACEBOOK,
        )) as User | null;

        if (!user) {
            user = (await this.userService.createUserWithThirdParty(
                this.makeUniqueUsername(
                    facebookUser.id,
                    ThirdPartyAuth.FACEBOOK,
                ),
                {
                    email: facebookUser.email || '',
                    firstName: facebookUser.first_name,
                    lastName: facebookUser.last_name,
                    uid: facebookUser.id,
                    type: ThirdPartyAuth.FACEBOOK,
                },
            )) as User;
        }

        const session = await this.authService.createSiteAuthSession({
            agent: ctx.request.headers['user-agent'] || '',
            ip: ctx.request.socket.remoteAddress || '',
            active: true,
            userId: user.id,
        });

        const accessToken = JwtTokenService.makeAccessToken({
            uid: user.id,
            sessionId: session.id,
            thirdPartyAuth: {
                type: ThirdPartyAuth.FACEBOOK,
                uid: facebookUser.id,
            },
        });
        JwtTokenService.setCookieAccessToken(ctx, accessToken);
        return {
            success: true,
            user,
        };
    }
}
