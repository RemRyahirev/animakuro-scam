import geoip from 'geoip-lite';
import requestIp from 'request-ip';
import { RegisterInputType } from '../models/inputs/register-input.type';
import { UserService } from '../../user/services/user.service';
import { MailPurpose, TokenType } from '../../../common/models/enums';
import { LoginInputType } from '../models/inputs/login-input.type';
import { User } from '../../user/models/user.model';
import { RegisterResultsType } from '../models/results/register-results.type';
import { SessionService } from '../../../common/services/session.service';
import { PasswordService } from '../../../common/services/password.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { Mailer } from '../../../mailer/mailer';
import { Context } from 'vm';
import { LoginResultsType } from '../models/results/login-results.type';
import { Injectable } from '@nestjs/common';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private mailer: Mailer,
        private sessionService: SessionService,
        private passwordService: PasswordService,
        private tokenService: TokenService,
    ) {}

    async login(
        args: LoginInputType,
        context: Context,
    ): Promise<LoginResultsType> {
        // TODO made setup mail notification
        const user = (await this.userService.findUserByUsername(
            args.username,
        )) as unknown as NonNullable<User>;
        const session = await this.sessionService.createSiteAuthSession({
            agent: context.req.headers['user-agent'] || '',
            ip: context.req.socket.remoteAddress || '', // TODO: recheck
            active: true,
            user_id: user.id,
        });
        const access_token = await this.tokenService.generateToken(
            user.id,
            session.id,
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
            user: user as User,
        };
    }

    async register(
        args: RegisterInputType,
        context: Context,
    ): Promise<RegisterResultsType> {
        args.password = await this.passwordService.encrypt(args.password);
        const user = await this.prisma.user.create({ data: args });
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

    async logout(ctx: Context) {
        // TODO rewrite logout logic
        return { success: true };
    }
}
