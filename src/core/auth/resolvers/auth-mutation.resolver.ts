import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { ICustomContext } from 'common/models/interfaces/custom-context.interface';
import { compare, hash } from 'common/utils/password.util';
import { GqlHttpException } from 'common/errors/errors';
import JwtTokenService from '../services/jwt-token.service';
import { ThirdPartyAuthType } from 'common/models/enums/user-third-party-type.enum';
import { ValidateSchemas } from 'common/decorators';
import { LoginInputType } from '../inputs/login-input.type';
import { HttpStatus } from 'common/models/enums/http-status.enum';
import { RegisterInputType } from '../inputs/register-input.type';
import { ThirdPartyAuthInputType } from '../inputs/third-party-input.type';
import { AuthMutationType, AuthRootResolver } from './auth-root.resolver';
import { User } from '../../user/models/user.model';
import * as crypto from 'crypto';

@Resolver(AuthMutationType)
export class AuthMutationResolver extends AuthRootResolver {
    constructor() {
        super();
    }

    private makeUniqueUsername = (id: string, prefix: ThirdPartyAuthType) => {
        const charSum = prefix.split('').reduce((acc, val) => {
            return acc + val.charCodeAt(0);
        }, 0);

        return `${id}User${charSum}`;
    };

    @FieldResolver(() => Boolean)
    @ValidateSchemas()
    async register(@Args() args: RegisterInputType) {
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

            return false;
        }

        const code = crypto.randomUUID();

        await this.authService.setRegisterConfirmation(code, args);

        // Sending email
        const info = await this.mailer.sendConfirmationMail({
            receiverEmail: args.email,
            code,
        });
        console.log(this.mailer.previewUrl(info));
        return true;
    }

    @FieldResolver(() => Boolean)
    async confirmRegistration(@Arg('code') code: string) {
        console.log(code);
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

            return false;
        }

        const hashedPassword = await hash(password);
        await this.userService.createUser({
            email,
            password: hashedPassword,
            username,
        });

        return true;
    }

    @FieldResolver(() => Boolean)
    async login(@Args() args: LoginInputType, @Ctx() ctx: ICustomContext) {
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

        return true;
    }

    @FieldResolver(() => Boolean)
    async logout(@Ctx() ctx: ICustomContext) {
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

        return true;
    }

    @FieldResolver(() => User)
    async loginOrRegisterThirdParty(
        @Arg('code', () => String) code: string,
        @Args() args: ThirdPartyAuthInputType,
        @Ctx() ctx: ICustomContext,
    ) {
        const facebookUser = await this.facebookStrategy.getAccountData(code);
        let user = (await this.userService.findUserByThirdpartyAuth(
            facebookUser.id,
            ThirdPartyAuthType.FACEBOOK,
        )) as User | null;

        if (!user) {
            user = (await this.userService.createUserWithThirdParty(
                this.makeUniqueUsername(
                    facebookUser.id,
                    ThirdPartyAuthType.FACEBOOK,
                ),
                {
                    email: facebookUser.email || '',
                    firstName: facebookUser.first_name,
                    lastName: facebookUser.last_name,
                    uid: facebookUser.id,
                    type: ThirdPartyAuthType.FACEBOOK,
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
                type: ThirdPartyAuthType.FACEBOOK,
                uid: facebookUser.id,
            },
        });
        JwtTokenService.setCookieAccessToken(ctx, accessToken);
        return user;
    }
}
