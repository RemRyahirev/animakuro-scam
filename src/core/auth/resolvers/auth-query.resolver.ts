import { FieldResolver, Resolver } from 'type-graphql';
import { ThirdPartyRedirectUrlResultsType } from '../models/results/third-party-redirect-url-results.type';
import { AuthQueryType, AuthRootResolver } from './auth-root.resolver';

@Resolver(AuthQueryType)
export class AuthQueryResolver extends AuthRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => ThirdPartyRedirectUrlResultsType)
    async getThirdPartyRedirectUrls() {
        return await this.authService.getThirdPartyRedirectUrls();
    }
}
