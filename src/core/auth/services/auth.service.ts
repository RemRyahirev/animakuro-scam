import { Config, Database } from "../../../loaders";
import geoip from 'geoip-lite';
import requestIp from 'request-ip';
import { RegisterInputType } from '../models/inputs/register-input.type';
import { FacebookStrategy } from "../strategies";
import { UserService } from '../../user/services/user.service';
import { MailPurpose, HttpStatus, ThirdPartyAuth } from '../../../common/models/enums';
import { GqlHttpException } from '../../../common/errors/errors';
import { compare, hash } from '../../../common/utils/password.util';
import { LoginInputType } from '../models/inputs/login-input.type';
import { ICustomContext } from '../../../common/models/interfaces';
import JwtTokenService from './jwt-token.service';
import { User } from '../../user/models/user.model';
import { ThirdPartyAuthInputType } from '../models/inputs/third-party-input.type';
import { ConfirmService } from '../../../common/services/confirm.service';
import { RegisterResultsType } from "../models/results/register-results.type";
import { SessionService } from "../../../common/services";
import { Mailer } from "../../../mailer/mailer";
import { generateHash } from "../../../common/utils/uills";
import { ConfigParent } from "../../../common/config/config";
import { Context } from "vm";
import { ValidationError } from "class-validator";
import { BaseResultsType } from "../../../common/models/results";
import { LoginResultsType } from "../models/results/login-results.type";

export class AuthService {
    private readonly prisma = new Database().logic;
    private readonly config: ConfigParent = new Config().logic;
    private readonly facebookStrategy: FacebookStrategy =
        new FacebookStrategy();
    private readonly userService: UserService = new UserService();
    private readonly sessionService: SessionService = new SessionService();
    private readonly mailer = new Mailer();
    private readonly confirmService = new ConfirmService();

    // async loginOrRegisterThirdPartyInfo(
    //     code: string,
    //     args: ThirdPartyAuthInputType,
    //     ctx: ICustomContext,
    // ) {
    //     const facebookUser = await this.facebookStrategy.getAccountData(code);
    //     let user = (await this.userService.findUserByThirdPartyAuth(
    //         facebookUser.id,
    //         ThirdPartyAuth.FACEBOOK,
    //     )) as User | null;
    //
    //     if (!user) {
    //         user = (await this.userService.createUserWithThirdParty(
    //             this.makeUniqueUsername(
    //                 facebookUser.id,
    //                 ThirdPartyAuth.FACEBOOK,
    //             ),
    //             {
    //                 email: facebookUser.email || '',
    //                 firstName: facebookUser.first_name,
    //                 lastName: facebookUser.last_name,
    //                 uid: facebookUser.id,
    //                 type: ThirdPartyAuth.FACEBOOK,
    //             },
    //         )) as unknown as User;
    //     }
    //
    //     const session = await this.sessionService.createSiteAuthSession({
    //         agent: ctx.request.headers['user-agent'] || '',
    //         ip: ctx.request.socket.remoteAddress || '',
    //         active: true,
    //         user_id: user.id,
    //     });
    //
    //     const accessToken = JwtTokenService.makeAccessToken({
    //         uid: user.id,
    //         sessionId: session.id,
    //         thirdPartyAuth: {
    //             type: ThirdPartyAuth.FACEBOOK,
    //             uid: facebookUser.id,
    //         },
    //     });
    //     JwtTokenService.setCookieAccessToken(ctx, accessToken);
    //     return {
    //         success: true,
    //         user,
    //     };
    // }
    //
    // async logoutInfo(ctx: ICustomContext) {
    //     const { userJwtPayload } = ctx;
    //     // rewrite decorator
    //
    //     if (!userJwtPayload)
    //         throw new GqlHttpException(
    //             'INVALID_SESSION',
    //             HttpStatus.BAD_REQUEST,
    //             'Auth Errors',
    //         );
    //
    //     const session = this.sessionService.updateSiteAuthSession(userJwtPayload.sessionId, {
    //         active: false,
    //     });
    //
    //     JwtTokenService.removeCookieAccessToken(ctx);
    //
    //     if (!session)
    //         throw new GqlHttpException(
    //             'INVALID_SESSION',
    //             HttpStatus.BAD_REQUEST,
    //             'Auth Errors',
    //         );
    //
    //     return { success: true };
    // }

    async login(args: LoginInputType, ctx: Context): Promise<LoginResultsType> {
        const user = await this.userService.findUserByUsername(args.username);
        // TODO handle exceptions in custom decorators(include username existance)
        if (!user) {
            return <LoginResultsType>{
                success: false,
                errors: [{
                    property: 'user',
                    value: null,
                    reason: 'User not found'
                }],
            };
        }
        if (!(await compare(args.password, user?.password || ''))) {
            return <LoginResultsType>{
                success: false,
                errors: [{
                    property: 'password',
                    value: args.password,
                    reason: 'Invalid password'
                }],
            };
        }
        const session = await this.sessionService.createSiteAuthSession({
            agent: ctx.request.headers['user-agent'] || '',
            ip: ctx.request.socket.remoteAddress || '', // TODO: recheck
            active: true,
            user_id: user.id,
        });
        const access_token = JwtTokenService.makeAccessToken({
            uid: user.id,
            sessionId: session.id,
        });
        const userIp = requestIp.getClientIp(ctx.request) || 1;
        const geoLookUp = geoip.lookup(userIp);
        await this.mailer.sendMail({
                to: user.email || '',
                subject: 'Login ✔'
            },
            MailPurpose.SECURITY_NOTIFICATION,
            {
                username: args.username,
                reset_link: 'https://' + ctx.headers.host + '/auth/recovery',
                ip: userIp,
                agent: ctx.request.headers['user-agent'] || '',
                platform: ctx.request.headers['sec-ch-ua-platform'],
                date: new Date().toLocaleDateString('ru', {
                    hour: 'numeric',
                    minute: 'numeric',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'utc',
                    formatMatcher: 'best fit'
                }),
                country: geoLookUp?.country,
                region: geoLookUp?.region,
                city: geoLookUp?.city,
                timezone: geoLookUp?.timezone,
            }
        );
        // JwtTokenService.setCookieAccessToken(ctx, accessToken);
        return {
            success: true,
            access_token,
            user: user as User,
        };
    }

    // async confirmRegistrationInfo(code: string) {
    //     try {
    //         await this.confirmService.confirmEmail(code);
    //     } catch (e) {
    //         return { success: false };
    //     }
    //
    //     return { success: true };
    // }

    async register(args: RegisterInputType, ctx: Context,): Promise<RegisterResultsType> {
        args.password = await hash(args.password);
        const usedEmailCount = await this.prisma.user.count({
            where: {
                email: args.email
            }
        });
        if (usedEmailCount >= 5) {
            return {
                success: false,
                user: null,
                errors: [{
                    property: 'Email',
                    value: usedEmailCount,
                    reason: 'Account limit exceeded'
                }]
            }
        }
        const user = await this.prisma.user.create({ data: args });
        const hashGen = generateHash();
        await this.mailer.sendMail({
            to: args.email,
            subject: 'Email confirmation ✔'
        },
            MailPurpose.CONFIRM_REGISTRATION,
            {
                username: args.username,
                confirm_link: 'https://' + ctx.headers.host + '/' + hashGen,
            }
        );
        return {
            success: true,
            user: user as any
        };
    }
    //
    // protected makeUniqueUsername(id: string, prefix: ThirdPartyAuth): string {
    //     const charSum = prefix.split('').reduce((acc, val) => {
    //         return acc + val.charCodeAt(0);
    //     }, 0);
    //
    //     return `${id}User${charSum}`;
    // }
    //
    // async getThirdPartyRedirectUrls() {
    //     return {
    //         success: true,
    //         facebook: this.facebookStrategy.getRedirectUrl(),
    //     };
    // }
}
