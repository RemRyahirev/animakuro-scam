import { ValidateSchemas } from 'common/decorators';
import { LoginInputType } from '../models/inputs/login-input.type';
import { RegisterInputType } from '../models/inputs/register-input.type';
import { AuthMutationType, AuthRootResolver } from './auth-root.resolver';
import { RegisterResultsType } from '../models/results/register-results.type';
import { LoginResultsType } from '../models/results/login-results.type';
import { LogoutResultsType } from '../models/results/logout-results.type';
import { Args, Context, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthService } from '../services/auth.service';
import { ExecutionContext } from '@nestjs/common';

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

    // @ResolveField(() => ConfirmRegistrationResultsType)
    // async confirmRegistration(
    //     @Arg('code') code: string,
    // ): Promise<ConfirmRegistrationResultsType> {
    //     return await this.authService.confirmRegistrationInfo(code);
    // }

    @ResolveField(() => LoginResultsType)
    async login(
        @Args() args: LoginInputType,
        @Context() context: ExecutionContext,
    ): Promise<LoginResultsType> {
        return await this.authService.login(args, context);
    }

    @ResolveField(() => LogoutResultsType)
    async logout(
        @Context() context: ExecutionContext,
    ): Promise<LogoutResultsType> {
        return await this.authService.logout(context);
    }

    // @ResolveField(() => LoginOrRegisterThirdPartyResultsType)
    // async loginOrRegisterThirdParty(
    //     @Arg('code', () => String) code: string,
    //     @Args() args: ThirdPartyAuthInputType,
    //     @Ctx() ctx: ICustomContext,
    // ): Promise<LoginOrRegisterThirdPartyResultsType> {
    //     return await this.authService.loginOrRegisterThirdPartyInfo(
    //         code,
    //         args,
    //         ctx,
    //     );
    // }
}
