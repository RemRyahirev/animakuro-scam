import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    AuthSessionMutationType,
    AuthSessionRootResolver,
} from './auth-session-root.resolver';
import { CreateAuthSessionResultsType } from '../models/results/create-auth-session-results.type';
import { AuthSessionService } from '../services/auth-session.service';
import { DeleteAuthSessionResultsType } from '../models/results/delete-auth-session-results.type';
import { UpdateAuthSessionInputType } from '../models/inputs/update-auth-session-input.type';
import { CreateAuthSessionInputType } from '../models/inputs/create-auth-session-input.type';
import { UpdateAuthSessionResultsType } from '../models/results/update-auth-session-results.type';

@Resolver(AuthSessionMutationType)
export class AuthSessionMutationResolver extends AuthSessionRootResolver {
    constructor(private authSessionService: AuthSessionService) {
        super();
    }

    @ResolveField(() => CreateAuthSessionResultsType)
    async createAuthSession(
        @Args() args: CreateAuthSessionInputType,
    ): Promise<CreateAuthSessionResultsType> {
        return await this.authSessionService.createAuthSession(args);
    }

    @ResolveField(() => UpdateAuthSessionResultsType)
    async updateAuthSession(
        @Args() args: UpdateAuthSessionInputType,
    ): Promise<UpdateAuthSessionResultsType> {
        return await this.authSessionService.updateAuthSession(args);
    }

    @ResolveField(() => DeleteAuthSessionResultsType)
    async deleteAuthSession(
        @Args('id') id: string,
    ): Promise<DeleteAuthSessionResultsType> {
        return await this.authSessionService.deleteAuthSession(id);
    }
}
