import { AccessToken, SocialProfile, ValidateSchemas } from 'common/decorators';
import { LoginInputType } from '../models/inputs/login-input.type';
import { RegisterInputType } from '../models/inputs/register-input.type';
import { AuthMutationType, AuthRootResolver } from './auth-root.resolver';
import { RegisterResultsType } from '../models/results/register-results.type';
import { LoginResultsType } from '../models/results/login-results.type';
import { LogoutResultsType } from '../models/results/logout-results.type';
import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { ExecutionContext, Req, UseGuards } from '@nestjs/common';
import { AuthType } from '../../../common/models/enums';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
import { SocialAuthGuard } from 'common/guards';

@Resolver(AuthMutationType)
export class AuthMutationResolver extends AuthRootResolver {
    constructor(protected authService: AuthService) {
        super();
    }

    @ResolveField(() => LogoutResultsType)
    @ValidateSchemas()
    async register(
        @Args() args: RegisterInputType,
        @Context() context: ExecutionContext,
    ): Promise<LogoutResultsType> {
        return await this.authService.sendEmail(
            args,
            context,
            //@ts-ignore
            context.req,
            //@ts-ignore
            context.res,
        );
    }

    @ResolveField(() => LoginResultsType)
    async login(
        @Args() args: LoginInputType,
        @Context() context: ExecutionContext,
    ): Promise<LoginResultsType> {
        console.log(args);
        return await this.authService.login(args, context);
    }

    @ResolveField(() => LogoutResultsType, {
        middleware: [AuthMiddleware],
    })
    async logout(@AccessToken() user_id: string): Promise<LogoutResultsType> {
        return await this.authService.logout(user_id);
    }

    @UseGuards(SocialAuthGuard)
    @ResolveField(() => RegisterResultsType)
    async registerSocial(
        @SocialProfile() profile: any,
        @Args('code') code: string,
        @Args('auth_type', { type: () => AuthType }) auth_type: AuthType,
    ): Promise<RegisterResultsType | { location: string }> {
        if (auth_type === 'jwt') {
            return { success: false };
        }
        if (!profile?.account?.username) {
            return { location: profile.location, success: true };
        }
        return await this.authService.registerSocial(profile, auth_type);
    }

    @ResolveField(() => RegisterResultsType, {
        middleware: [AuthMiddleware],
    })
    async emailConfirmation(
        @Args('token') token: string,
    ): Promise<RegisterResultsType> {
        return await this.authService.emailConfirmation(token);
    }
}
