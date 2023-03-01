import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationInputType } from '@app/common/models/inputs';

import { GetListUserCollectionResultsType } from '../models/results/get-list-user-collection-results.type';
import { GetUserCollectionResultsType } from '../models/results/get-user-collection-results.type';
import { UserCollectionService } from '../services/user-collection.service';

import {
    UserCollectionQueryType,
    UserCollectionRootResolver,
} from './user-collection-root.resolver';

@Resolver(UserCollectionQueryType)
export class UserCollectionQueryResolver extends UserCollectionRootResolver {
    constructor(private userCollectionService: UserCollectionService) {
        super();
    }

    @ResolveField(() => GetUserCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getUserCollection(
        @Args('id') id: string,
    ): Promise<GetUserCollectionResultsType> {
        return await this.userCollectionService.getUserCollection(id);
    }

    @ResolveField(() => GetListUserCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getUserCollectionList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserCollectionResultsType> {
        return await this.userCollectionService.getUserCollectionList(args);
    }

    @ResolveField(() => GetListUserCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getUserCollectionListByUserId(
        @AccessToken() user_id: string,
        @Args('id', {nullable: true, description: "By user id"}) id: string,
        @Args() args: PaginationInputType,
    ): Promise<GetListUserCollectionResultsType> {
        return this.userCollectionService.getUserCollectionListByUserId(
            id ?? user_id,
            args,
        );
    }
}
