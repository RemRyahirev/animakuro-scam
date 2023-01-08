import { AuthQueryType, AuthRootResolver } from './auth-root.resolver';
import { Resolver } from '@nestjs/graphql';

@Resolver(AuthQueryType)
export class AuthQueryResolver extends AuthRootResolver {
    constructor() {
        super();
    }

    // @ResolveField(() => ThirdPartyRedirectUrlResultsType)
    // async getThirdPartyRedirectUrls() {
    //     return await this.authService.getThirdPartyRedirectUrls();
    // }
}
