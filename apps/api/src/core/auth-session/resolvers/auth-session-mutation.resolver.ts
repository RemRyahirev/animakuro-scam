import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { CreateAuthSessionResultsType } from '../models/results/create-auth-session-results.type';
import { AuthSessionService } from '../services/auth-session.service';
import { DeleteAuthSessionResultsType } from '../models/results/delete-auth-session-results.type';
import { UpdateAuthSessionArgsType } from '../models/inputs/update-auth-session-args.type';
import { CreateAuthSessionArgsType } from '../models/inputs/create-auth-session-args.type';
import { UpdateAuthSessionResultsType } from '../models/results/update-auth-session-results.type';

import {
    AuthSessionMutationType,
    AuthSessionRootResolver,
} from './auth-session-root.resolver';

@Resolver(AuthSessionMutationType)
export class AuthSessionMutationResolver extends AuthSessionRootResolver {
    constructor(private authSessionService: AuthSessionService) {
        super();
    }

    @ResolveField(() => CreateAuthSessionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async createAuthSession(
        @Args() args: CreateAuthSessionArgsType,
        @AccessToken() user_id: string,
    ): Promise<CreateAuthSessionResultsType> {
        return await this.authSessionService.createAuthSession({
            ...args,
            user_id: args.user_id ?? user_id,
        });
    }

    @ResolveField(() => UpdateAuthSessionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateAuthSession(
        @Args() args: UpdateAuthSessionArgsType,
    ): Promise<UpdateAuthSessionResultsType> {
        return await this.authSessionService.updateAuthSession(args);
    }

    @ResolveField(() => DeleteAuthSessionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteAuthSession(
        @Args('id') id: string,
    ): Promise<DeleteAuthSessionResultsType> {
        return await this.authSessionService.deleteAuthSession(id);
    }
}
