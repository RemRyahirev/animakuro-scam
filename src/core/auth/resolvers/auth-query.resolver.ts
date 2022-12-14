import { FieldResolver, Resolver } from 'type-graphql';
import { ThirdPartyRedirectUrlReturnType } from '../schemas/auth.schema';
import { AuthQueryType, AuthRootResolver } from './auth-root.resolver';

@Resolver(AuthQueryType)
export class AuthQueryResolver extends AuthRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => ThirdPartyRedirectUrlReturnType)
    async getThirdPartyRedirectUrls() {
        return {
            facebook: this.facebookStrategy.getRedirectUrl(),
        };
    }
}
