import {
    AccessToken,
    CustomSession,
    SocialProfile,
    ValidateSchemas,
} from 'common/decorators';
import { LoginInputType } from '../models/inputs/login-input.type';
import { RegisterInputType } from '../models/inputs/register-input.type';
import { AuthMutationType, AuthRootResolver } from './auth-root.resolver';
import { RegisterResultsType } from '../models/results/register-results.type';
import { LoginResultsType } from '../models/results/login-results.type';
import { LogoutResultsType } from '../models/results/logout-results.type';
import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { ExecutionContext } from '@nestjs/common';
import { AuthType } from '../../../common/models/enums';
import { Profile } from 'passport';
import { LoginSocialInputType } from '../models/inputs/login-social-input.type';

@Resolver(AuthMutationType)
export class AuthMutationResolver extends AuthRootResolver {
    constructor(protected authService: AuthService) {
        super();
    }

    @ResolveField(() => RegisterResultsType)
    @ValidateSchemas()
    async register(
        @Args() args: RegisterInputType,
        @Context() context: ExecutionContext,
    ): Promise<RegisterResultsType> {
        return await this.authService.register(args, context);
    }

    @ResolveField(() => LoginResultsType)
    async login(
        @Args() args: LoginInputType,
        @Context() context: ExecutionContext,
    ): Promise<LoginResultsType> {
        console.log(args);
        return await this.authService.login(args, context);
    }

    @ResolveField(() => LogoutResultsType)
    async logout(
        @CustomSession() session: Record<string, any>,
        @AccessToken() user_id: string,
    ): Promise<LogoutResultsType> {
        return await this.authService.logout(session, user_id);
    }

    @ResolveField(() => LoginResultsType)
    async loginSocial(@Args() args: LoginSocialInputType) {
        return await this.authService.loginSocial(
            args.access_token,
            args.auth_type,
        );
    }

    @ResolveField(() => RegisterResultsType)
    async registerSocial(
        @SocialProfile() profile: Profile,
        @Args('code') code: string,
        @Args('auth_type') auth_type: AuthType,
    ) {
        return await this.authService.registerSocial(code, auth_type);
    }

    @ResolveField(() => RegisterResultsType)
    async emailConfirmation(
        @AccessToken() user_id: string,
    ): Promise<RegisterResultsType> {
        return await this.authService.emailConfirmation(user_id);
    }
}
