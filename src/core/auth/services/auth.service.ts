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
import { ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthSessionService } from '../../auth-session/services/auth-session.service';
import { userDefaults } from '../../../common/defaults/user-defaults';
import { LogoutResultsType } from '../models/results/logout-results.type';
import {
    InjectThrottlerOptions,
    InjectThrottlerStorage,
    ThrottlerModuleOptions,
    ThrottlerStorage,
} from '@nestjs/throttler';
import { Reflector } from '@nestjs/core';
import { HandleRequest } from './handleRequest';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    throttler: HandleRequest;
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private configService: ConfigService,
        private mailer: Mailer,
        private passwordService: PasswordService,
        private tokenService: TokenService,
        private authSessionService: AuthSessionService,

        @InjectThrottlerOptions()
        protected readonly options: ThrottlerModuleOptions,
        @InjectThrottlerStorage()
        protected readonly storageService: ThrottlerStorage,
        protected readonly reflector: Reflector,
    ) {
        this.throttler = new HandleRequest(options, storageService, reflector);
    }
    async emailConfirmation(token: string): Promise<RegisterResultsType> {
        const userData = await this.tokenService.decodeToken(token);

        if (!userData) {
            return {
                success: false,
                errors: [
                    {
                        property: 'token',
                        value: token,
                        reason: 'No user matched by this token',
                    },
                ],
            };
        }

        const user = await this.prisma.user.create({
            data: {
                email: userData.email as any,
                password: userData.password as any,
                username: userData.username as any,
                is_email_confirmed: true,
                ...userDefaults,
            },
            include: {
                auth: true,
                user_profile: {
                    include: {
                        profile_settings: true,
                    },
                },
                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_genres: true,
                favourite_studios: true,
                user_folders: {
                    include: {
                        animes: true,
                    },
                },
            },
        });

        const access_token = await this.tokenService.generateToken(
            user.id,
            null,
            TokenType.ACCESS_TOKEN,
        );

        return {
            success: true,
            access_token,
            user: user as any,
        };
    }

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
            ip: context.req.socket.remoteAddress || '',
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
                    'https://' +
                    this.configService.get<string>('MAILER_REDIRECT_HOST') +
                    '/auth/recovery',
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

    async sendEmail(
        args: RegisterInputType,
        context: ExecutionContext,
        req: any,
        res: any,
    ): Promise<LogoutResultsType> {
        if (!args) {
            return {
                success: false,
            };
        }
        if (await this.throttler._handleRequest(1, 120, req, res)) {
            return await this.register(args, context);
        }
        return { success: false };
    }

    async register(
        args: RegisterInputType,
        context: Context,
    ): Promise<LogoutResultsType> {
        args.password = await this.passwordService.encrypt(args.password);
        const token = await this.tokenService.generateEmailToken(
            args.email,
            args.password,
            args.username,
        );
        await this.mailer.sendMail(
            {
                to: args.email,
                subject: 'Email confirmation ✔',
            },
            MailPurpose.CONFIRM_REGISTRATION,
            {
                username: args.username,
                confirm_link:
                    'https://' +
                    this.configService.get<string>('MAILER_REDIRECT_HOST') +
                    '/' +
                    token,
            },
        );
        console.log(token);
        return {
            success: true,
        };
    }

    async registerSocial(
        profile: any,
        auth_type: AuthType,
    ): Promise<RegisterResultsType> {
        // if (await this.throttler._handleRequest(1, 120, req, res)) {
        // Код сюда
        // }
        const alreadyCreated = await this.prisma.user.findFirst({
            where: {
                email: profile.account.email,
                social_service:
                    auth_type.toUpperCase() as keyof typeof AuthType,
            },
        });

        const byUsername = await this.prisma.user.findFirst({
            where: {
                username: profile.account.username,
            },
        });

        if (alreadyCreated) {
            const access_token = await this.tokenService.generateToken(
                alreadyCreated.id as any,
                null,
                TokenType.ACCESS_TOKEN,
            );
            return {
                success: true,
                user: alreadyCreated as any,
                access_token,
            };
        } else if (!alreadyCreated && !byUsername) {
            const result = await this.prisma.user.create({
                data: {
                    username: profile.account.username,
                    email: profile.account.email,
                    password: '',
                    avatar: profile.account.avatar,
                    is_email_confirmed: true,
                    social_service:
                        auth_type.toUpperCase() as keyof typeof AuthType,
                },
            });
            const id = result.id;
            const access_token = await this.tokenService.generateToken(
                id as any,
                null,
                TokenType.ACCESS_TOKEN,
            );
            await this.prisma.auth.create({
                data: {
                    // @ts-ignore
                    type: auth_type.toUpperCase() as keyof typeof AuthType,
                    access_token,
                    uuid: profile.account.uuid,
                    email: profile.account.email,
                    username: profile.account.username,
                    avatar: profile.account.avatar,
                    user_id: result!.id,
                },
            });

            return {
                success: true,
                user: result as any,
                access_token,
            };
        } else {
            const date = new Date().getTime();
            const username = 'user_' + date;

            const user = await this.prisma.user.create({
                data: {
                    username,
                    email: profile.account.email,
                    password: '',
                    avatar: profile.account.avatar,
                    is_email_confirmed: true,
                    social_service:
                        auth_type.toUpperCase() as keyof typeof AuthType,
                },
            });

            const id = user.id;
            const access_token = await this.tokenService.generateToken(
                id as any,
                null,
                TokenType.ACCESS_TOKEN,
            );
            await this.prisma.auth.create({
                data: {
                    // @ts-ignore
                    type: auth_type.toUpperCase() as keyof typeof AuthType,
                    access_token,
                    uuid: profile.account.uuid,
                    email: profile.account.email,
                    username,
                    avatar: profile.account.avatar,
                    user_id: user!.id,
                },
            });

            return {
                success: true,
                user: user as any,
                access_token,
            };
        }
        // return {
        //     success: false,
        //     user: null as any,
        //     access_token: '',
        // };
    }

    async logout(user_id: string): Promise<LogoutResultsType> {
        if (!user_id) {
            return {
                success: false,
                errors: [
                    {
                        property: 'access_token',
                        value: user_id,
                        reason: 'Token is invalid',
                    },
                ],
            };
        }
        const authorizedSession = await this.prisma.authSession.findFirst({
            where: {
                user_id,
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
