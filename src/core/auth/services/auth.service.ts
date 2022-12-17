import Database from 'database';
import { RegisterInputType } from '../models/inputs/register-input.type';
import {
    CreateSiteAuthSessionInput,
    UpdateSiteAuthSessionInput,
} from 'core/auth/models/inputs/site-auth-session.schema';
import Redis from '../../../loaders/redis';
import { FacebookStrategy } from '../strategies/facebook.strategy';
import { UserService } from '../../user/services/user.service';
import { Mailer } from '../../../common/utils/mailer';
import { HttpStatus, ThirdPartyAuth } from '../../../common/models/enums';
import { GqlHttpException } from '../../../common/errors/errors';
import crypto from 'crypto';
import { compare, hash } from '../../../common/utils/password.util';
import { LoginInputType } from '../models/inputs/login-input.type';
import { ICustomContext } from '../../../common/models/interfaces';
import JwtTokenService from './jwt-token.service';
import { User } from '../../user/models/user.model';
import { ThirdPartyAuthInputType } from '../models/inputs/third-party-input.type';

export class AuthService {
    private readonly prisma = Database.getInstance().logic;
    private readonly redis = Redis.getInstance().logic;
    private readonly facebookStrategy: FacebookStrategy =
        new FacebookStrategy();
    private readonly userService: UserService = new UserService();
    private readonly mailer = new Mailer();

    async loginOrRegisterThirdPartyInfo(
        code: string,
        args: ThirdPartyAuthInputType,
        ctx: ICustomContext,
    ) {
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

        const session = await this.createSiteAuthSession({
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

    async logoutInfo(ctx: ICustomContext) {
        const { userJwtPayload } = ctx;
        // rewrite decorator

        if (!userJwtPayload)
            throw new GqlHttpException(
                'INVALID_SESSION',
                HttpStatus.BAD_REQUEST,
                'Auth Errors',
            );

        const session = this.updateSiteAuthSession(userJwtPayload.sessionId, {
            active: false,
        });

        JwtTokenService.removeCookieAccessToken(ctx);

        if (!session)
            throw new GqlHttpException(
                'INVALID_SESSION',
                HttpStatus.BAD_REQUEST,
                'Auth Errors',
            );

        return { success: true };
    }

    async loginInfo(args: LoginInputType, ctx: ICustomContext) {
        const user = await this.userService.findUserByUsername(args.username);

        if (!user || !(await compare(args.password, user.password || '')))
            throw new GqlHttpException(
                'INVALID_CREDENTIALS',
                HttpStatus.BAD_REQUEST,
                'Auth Errors',
            );

        const session = await this.createSiteAuthSession({
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

    async confirmRegistrationInfo(code: string) {
        const registerInput = await this.getRegisterConfirmation(code);

        if (!registerInput)
            throw new GqlHttpException(
                'CODE_NOT_FOUND',
                HttpStatus.NOT_FOUND,
                'Auth Errors',
            );

        await this.deleteRegisterConfirmation(code);

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

    async registerInfo(args: RegisterInputType) {
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

        await this.setRegisterConfirmation(code, args);

        // Sending email
        const info = await this.mailer.sendConfirmationMail({
            receiverEmail: args.email,
            code,
        });
        console.log(this.mailer.previewUrl(info));
        return { success: true };
    }

    protected makeUniqueUsername(id: string, prefix: ThirdPartyAuth): string {
        const charSum = prefix.split('').reduce((acc, val) => {
            return acc + val.charCodeAt(0);
        }, 0);

        return `${id}User${charSum}`;
    }

    async getThirdPartyRedirectUrls() {
        return {
            success: true,
            facebook: this.facebookStrategy.getRedirectUrl(),
        };
    }

    async setRegisterConfirmation(code: string, data: RegisterInputType) {
        await Redis.getInstance().connect();
        await this.redis
            .set(`confirmation:register:${code}`, JSON.stringify(data), {
                EX: 999999,
            })
            .catch(console.error);
    }

    async getRegisterConfirmation(
        code: string,
    ): Promise<RegisterInputType | null> {
        await Redis.getInstance().connect();
        const data = await this.redis
            .get(`confirmation:register:${code}`)
            .catch(console.error);
        console.log(data);
        if (!data) {
            return null;
        }
        return JSON.parse(data);
    }

    async deleteRegisterConfirmation(code: string) {
        await Redis.getInstance().connect();
        await this.redis
            .del(`confirmation:register:${code}`)
            .catch(console.error);
    }

    async createSiteAuthSession({
        userId,
        ...rest
    }: CreateSiteAuthSessionInput) {
        return await this.prisma.siteAuthSession.create({
            data: {
                userId: userId || '0',
                ...rest,
            },
        });
    }

    async updateSiteAuthSession(
        id: string,
        siteAuthSessionInput: UpdateSiteAuthSessionInput,
    ) {
        return await this.prisma.siteAuthSession.update({
            where: {
                id,
            },
            data: siteAuthSessionInput,
        });
    }
}
