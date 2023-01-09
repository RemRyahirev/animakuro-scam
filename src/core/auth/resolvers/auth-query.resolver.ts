import { AuthQueryType, AuthRootResolver } from './auth-root.resolver';
import { Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';

@Resolver(AuthQueryType)
export class AuthQueryResolver extends AuthRootResolver {
    constructor(private authService: AuthService) {
        super();
    }

    // @ResolveField(() => ThirdPartyRedirectUrlResultsType)
    // async getThirdPartyRedirectUrls() {
    //     return await this.authService.getThirdPartyRedirectUrls();
    // }
}
