import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ICustomContext } from 'common/types/interfaces/custom-context.interface';
import { ThirdPartyRedirectUrlReturnType } from '../schemas/auth.schema';
import { compare, hash } from 'common/utils/password.util';
import { randomUUID } from 'crypto';
import { GqlHttpException } from 'common/errors/errors';
import JwtTokenService from '../services/jwt-token.service';
import { FacebookStrategy } from '../strategies/facebook.strategy';
import { AuthService } from '../services/auth.service';
import { User } from 'core/user/schemas/user.schema';
import { ThirdPartyAuthType } from 'core/user/enums/user-third-party-type.enum';
import { UserService } from 'core/user/services/user.service';
import { ValidateSchemas } from 'common/decorators';
import { LoginInputType } from '../inputs/login-input.type';
import { Mailer } from '../../../common/utils/mailer';
import { HttpStatus } from '../../../common/types/enums/http-status.enum';
import { RegisterInputType } from '../inputs/register-input.type';
import { ThirdPartyAuthInputType } from '../inputs/third-party-input.type';

@Resolver()
export class AuthResolver {
    private facebookStrategy: FacebookStrategy;
    private userService: UserService;
    private jwtTokenService: JwtTokenService;
    private authService: AuthService;
    private mailer = new Mailer();

    constructor() {
        this.facebookStrategy = new FacebookStrategy();
        this.userService = new UserService();
        this.jwtTokenService = new JwtTokenService();
        this.authService = new AuthService();
    }

    private makeUniqueUsername = (id: string, prefix: ThirdPartyAuthType) => {
        const charSum = prefix.split('').reduce((acc, val) => {
            return acc + val.charCodeAt(0);
        }, 0);

        return `${id}User${charSum}`;
    };

    @Mutation(() => Boolean, {
        description: 'Register user, needs confirmation',
    })
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

        // const code = await nanoid(30)
        const code = randomUUID();

        await this.authService.setRegisterConfirmation('test', args);

        // Sending email
        const info = await this.mailer.sendConfirmationMail({
            receiverEmail: args.email,
            code,
        });
        console.log(this.mailer.previewUrl(info));
        return true;
    }

    @Mutation(() => Boolean, { description: 'Confirm registration' })
    async confirmRegistration(@Arg('code') code: string) {
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

    @Mutation(() => Boolean, { description: 'User login' })
    async login(@Args() args: LoginInputType, @Ctx() ctx: ICustomContext) {
        const user = await this.userService.findUserByUsername(args.username);

        if (!user || !(await compare(args.password, user.password || '')))
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

    @Mutation(() => Boolean, { description: 'User logout' })
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

    @Mutation(() => User, { description: 'Login or register 3rd party' })
    async loginOrRegisterThirdParty(
        @Arg('code', () => String) code: string,
        @Args() args: ThirdPartyAuthInputType,
        @Ctx() ctx: ICustomContext,
    ) {
        const facebookUser = await this.facebookStrategy.getAccountData(code);

        let user = await this.userService.findUserByThirdpartyAuth(
            facebookUser.id,
            ThirdPartyAuthType.FACEBOOK,
        );

        if (!user) {
            user = await this.userService.createUserWithThirdParty(
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
            );
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

        // const thirdpartyAuthRedisKey = JwtTokenService.getThirdPartyAuthRedisKey(ThirdPartyAuthType.FACEBOOK, facebookUser.id)

        // await this.jwtTokenService.saveJwtAccessToken(thirdpartyAuthRedisKey, accessToken)

        JwtTokenService.setCookieAccessToken(ctx, accessToken);

        return user;
    }

    @Query(() => ThirdPartyRedirectUrlReturnType, {
        description: 'Get 3rd party urls',
    })
    async getThirdPartyRedirectUrls() {
        return {
            facebook: this.facebookStrategy.getRedirectUrl(),
        };
    }
}
