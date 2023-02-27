import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationInputType } from '@app/common/models/inputs';

import { AuthSessionService } from '../services/auth-session.service';
import { GetAuthSessionResultsType } from '../models/results/get-auth-session-results.type';
import { GetListAuthSessionResultsType } from '../models/results/get-list-auth-session-results.type';

import {
    AuthSessionQueryType,
    AuthSessionRootResolver,
} from './auth-session-root.resolver';

@Resolver(AuthSessionQueryType)
export class AuthSessionQueryResolver extends AuthSessionRootResolver {
    constructor(private authSessionService: AuthSessionService) {
        super();
    }

    @ResolveField(() => GetAuthSessionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getAuthSession(@Args('id') id: string): Promise<GetAuthSessionResultsType> {
        return await this.authSessionService.getAuthSession(id);
    }

    @ResolveField(() => GetListAuthSessionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getAuthSessionList(
        @Args() args: PaginationInputType,
    ): Promise<GetListAuthSessionResultsType> {
        return await this.authSessionService.getAuthSessionList(args);
    }
}
