import geoip from 'geoip-lite';
import requestIp from 'request-ip';
import { RegisterInputType } from '../models/inputs/register-input.type';
import { UserService } from '../../user/services/user.service';
import { MailPurpose } from '../../../common/models/enums';
import { compare, hash } from "../../../common/utils/password.util";
import { LoginInputType } from '../models/inputs/login-input.type';
import JwtTokenService from './jwt-token.service';
import { User } from '../../user/models/user.model';
import { RegisterResultsType } from '../models/results/register-results.type';
import { PrismaService, SessionService } from '../../../common/services';
import { Mailer } from '../../../mailer/mailer';
import { generateHash } from '../../../common/utils/uills';
import { Context } from 'vm';
import { LoginResultsType } from '../models/results/login-results.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private mailer: Mailer,
        private sessionService: SessionService,
    ) {}

    public async validateUser(args: LoginInputType): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { username: args.username },
        });
        if (user && await compare(args.password, user.password || '')) {
            return user as any;
        }
        return null;
    }

    async logout(ctx: Context) {
        // TODO rewrite logout logic
        return { success: true };
    }

    async login(
        args: LoginInputType,
        context: Context,
    ): Promise<LoginResultsType> {
        //TODO made setup mail notification
        const user = (await this.userService.findUserByUsername(
            args.username,
        )) as NonNullable<User>;
        const session = await this.sessionService.createSiteAuthSession({
            agent: context.req.headers['user-agent'] || '',
            ip: context.req.socket.remoteAddress || '', // TODO: recheck
            active: true,
            user_id: user.id,
        });
        const access_token = JwtTokenService.makeAccessToken({
            uid: user.id,
            sessionId: session.id,
        });
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
        // JwtTokenService.setCookieAccessToken(ctx, accessToken);
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
        args.password = await hash(args.password);
        const user = await this.prisma.user.create({ data: args });
        const hashGen = generateHash();
        await this.mailer.sendMail(
            {
                to: args.email,
                subject: 'Email confirmation ✔',
            },
            MailPurpose.CONFIRM_REGISTRATION,
            {
                username: args.username,
                confirm_link: 'https://' + context.req.headers.host + '/' + hashGen,
            },
        );
        return {
            success: true,
            user: user as any,
        };
    }
}
