import { UseGuards } from '@nestjs/common';
import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationArgsType } from '@app/common/models/inputs';

import { GetListUserResultsType } from '../models/results/get-list-user-results.type';
import { GetUserResultsType } from '../models/results/get-user-results.type';
import { GetListUserByEmailResultsType } from '../models/results/get-list-user-by-email-results.type';
import { UserService } from '../services/user.service';

import { UserQueryType, UserRootResolver } from './user-root.resolver';

@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @ResolveField()
    async getUsersByEmail(
        @Args('email') email: string,
        @Args() args: PaginationArgsType,
    ): Promise<GetListUserByEmailResultsType> {
        return await this.userService.getUsersByEmail(email, args);
    }

    @ResolveField(() => GetUserResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getUser(
        @AccessToken() user_id: string,
        @Args('id', { nullable: true }) id: string,
        @Args('username', { nullable: true }) username: string,
    ): Promise<GetUserResultsType> {
        return await this.userService.getUser({ user_id, username, id });
    }

    @ResolveField(() => GetListUserResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getUserList(
        @Args() args: PaginationArgsType,
    ): Promise<GetListUserResultsType> {
        return await this.userService.getUserList(args);
    }

    @ResolveField(() => GetUserResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getUserById(
        @Args('id', { nullable: true }) id: string,
        @AccessToken() user_id: string,
    ): Promise<GetUserResultsType> {
        return await this.userService.findOneById(id ?? user_id);
    }
}
