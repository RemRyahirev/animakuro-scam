import { ExecutionContext, UseGuards } from '@nestjs/common';
import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';

import {
    AccessToken,
    SocialProfile,
    ValidateSchemas,
} from '@app/common/decorators';
import { SocialAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { AuthType } from '@app/common/models/enums';

import { LoginInputType } from '../models/inputs/login-input.type';
import { RegisterInputType } from '../models/inputs/register-input.type';
import { RegisterResultsType } from '../models/results/register-results.type';
import { LoginResultsType } from '../models/results/login-results.type';
import { LogoutResultsType } from '../models/results/logout-results.type';
import { AuthService } from '../services/auth.service';

import { AuthMutationType, AuthRootResolver } from './auth-root.resolver';

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
        if (String(auth_type)?.toLowerCase() === 'jwt') {
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

    @ResolveField(() => LogoutResultsType)
    async resetPassFirstStep(
        @Args('username') username: string,
    ): Promise<LogoutResultsType> {
        return await this.authService.resetPasswordFirstStep(username);
    }

    @ResolveField(() => LoginResultsType)
    async resetPassSecondStep(
        @Args('newPassword') newPassword: string,
        @Args('code') code: string,
    ): Promise<LoginResultsType> {
        return await this.authService.resetPasswordSecondStep(
            newPassword,
            code,
        );
    }
}
