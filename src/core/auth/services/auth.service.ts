import geoip from 'geoip-lite';
import requestIp from 'request-ip';
import { RegisterInputType } from '../models/inputs/register-input.type';
import { UserService } from '../../user/services/user.service';
import { AuthType, MailPurpose, TokenType } from '../../../common/models/enums';
import { LoginInputType } from '../models/inputs/login-input.type';
import { User } from '../../user/models/user.model';
import { RegisterResultsType } from '../models/results/register-results.type';
import { PasswordService } from '../../../common/services/password.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { Mailer } from '../../../mailer/mailer';
import { Context } from 'vm';
import { LoginResultsType } from '../models/results/login-results.type';
import { Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthSessionService } from '../../auth-session/services/auth-session.service';
import { userDefaults } from '../../../common/defaults/user-defaults';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private mailer: Mailer,
        private passwordService: PasswordService,
        private tokenService: TokenService,
        private authSessionService: AuthSessionService,
    ) {}

    async login(
        args: LoginInputType,
        context: Context,
    ): Promise<LoginResultsType> {
        // TODO made setup mail notification
        const user = (await this.userService.findUserByUsername(
            args.username,
        )) as unknown as NonNullable<User>;
        const session = await this.authSessionService.createAuthSession({
            agent: context.req.headers['user-agent'] || '',
            ip: context.req.socket.remoteAddress || '', // TODO: recheck
            active: true,
            user_id: user.id,
        });
        const access_token = await this.tokenService.generateToken(
            user.id,
            session.auth_session!.id ?? null,
            TokenType.ACCESS_TOKEN,
        );
        const userIp = requestIp.getClientIp(context.req) || 1;
        const geoLookUp = geoip.lookup(userIp);
        await this.mailer.sendMail(
            {
                to: user.email || '',
                subject: 'Login ✔',
            },
            MailPurpose.SECURITY_NOTIFICATION,
            {
                username: args.username,
                reset_link:
                    'https://' + context.req.headers.host + '/auth/recovery',
                ip: userIp,
                agent: context.req.headers['user-agent'] || '',
                platform: context.req.headers['sec-ch-ua-platform'],
                date: new Date().toLocaleDateString('ru', {
                    hour: 'numeric',
                    minute: 'numeric',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'utc',
                    formatMatcher: 'best fit',
                }),
                country: geoLookUp?.country,
                region: geoLookUp?.region,
                city: geoLookUp?.city,
                timezone: geoLookUp?.timezone,
            },
        );
        return {
            success: true,
            access_token,
            user,
        };
    }

    async loginSocial(
        access_token: string,
        auth_type: AuthType,
    ): Promise<LoginResultsType> {
        const auth = await this.prisma.auth.findFirst({
            where: {
                access_token,
            },
        });
        // TODO move validation in decorator
        if (!auth) {
            return {
                success: false,
                errors: [
                    {
                        property: 'access_token',
                        value: access_token,
                        reason: 'No user matched by this token',
                    },
                ],
                access_token: undefined,
                user: null,
            };
        }
        const user = await this.userService.findOneById(
            auth!.user_id as string,
        );
        return {
            success: true,
            access_token: access_token,
            user: user as any,
        };
    }

    async register(
        args: RegisterInputType,
        context: Context,
    ): Promise<RegisterResultsType> {
        args.password = await this.passwordService.encrypt(args.password);
        const user = await this.prisma.user.create({
            data: {
                ...args,
                ...userDefaults,
            },
        });
        const hash = this.tokenService.generateToken(
            user.id,
            null,
            TokenType.EMAIL_TOKEN,
        );
        const access_token = await this.tokenService.generateToken(
            user.id,
            null,
            TokenType.ACCESS_TOKEN,
        );
        await this.prisma.auth.create({
            data: {
                // @ts-ignore
                type: AuthType.JWT.toUpperCase(),
                access_token,
                uuid: '',
                email: user.email,
                username: user.username,
                avatar: user?.avatar,
                user_id: user?.id,
            },
        });
        await this.mailer.sendMail(
            {
                to: args.email,
                subject: 'Email confirmation ✔',
            },
            MailPurpose.CONFIRM_REGISTRATION,
            {
                username: args.username,
                confirm_link:
                    'https://' + context.req.headers.host + '/' + hash,
            },
        );
        return {
            success: true,
            access_token,
            user: user as any,
        };
    }

    async registerSocial(
        profile: any,
        auth_type: AuthType,
    ): Promise<RegisterResultsType> {
        const result = await this.userService.createUser({
            username: profile.account.username,
            email: profile.account.email,
            password: '',
            avatar: profile.account.avatar,
            is_email_confirmed: false,
        });
        const access_token = await this.tokenService.generateToken(
            profile.account.uuid,
            null,
            TokenType.ACCESS_TOKEN,
        );
        await this.prisma.auth.create({
            data: {
                type: auth_type.toUpperCase() as keyof typeof AuthType,
                access_token,
                uuid: profile.account.uuid,
                email: profile.account.email,
                username: profile.account.username,
                avatar: profile.account.avatar,
                user_id: result.user!.id,
            },
        });
        const user = await this.prisma.user.findFirst({
            where: {
                id: result.user?.id,
            },
            include: {
                auth: true,
            },
        });
        return {
            success: true,
            access_token,
            user: user as any,
        };
    }

    async logout(session: Record<string, any>, access_token: string) {
        // TODO made cleanup database and store after user logout
        const auth = await this.prisma.auth.findFirst({
            where: {
                access_token,
            },
        });
        const authorizedUserId = auth?.user_id;
        const authorizedSession = await this.prisma.authSession.findFirst({
            where: {
                user_id: authorizedUserId,
            },
        });
        await this.prisma.authSession.update({
            where: {
                id: authorizedSession!.id,
            },
            data: {
                active: false,
            },
        });
        return { success: true };
    }
}
