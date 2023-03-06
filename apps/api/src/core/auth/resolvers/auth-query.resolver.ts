import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { OathUrlArgsType } from '../models/inputs/oath-url-args.type';
import { AuthService } from '../services/auth.service';

import { AuthQueryType, AuthRootResolver } from './auth-root.resolver';

@Resolver(AuthQueryType)
export class AuthQueryResolver extends AuthRootResolver {
    constructor(private authService: AuthService) {
        super();
    }

    @ResolveField(() => String)
    async oauthRedirectUrl(@Args() args: OathUrlArgsType) {
        // return await this.authService.oauthRedirectUrl(args);
    }
}
