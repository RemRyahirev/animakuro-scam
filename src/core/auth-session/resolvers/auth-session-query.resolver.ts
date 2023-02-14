import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import {
    AuthSessionQueryType,
    AuthSessionRootResolver,
} from './auth-session-root.resolver';
import { AuthSessionService } from '../services/auth-session.service';
import { GetAuthSessionResultsType } from '../models/results/get-auth-session-results.type';
import { GetListAuthSessionResultsType } from '../models/results/get-list-auth-session-results.type';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
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
