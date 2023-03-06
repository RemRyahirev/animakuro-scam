import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken, ProfileId } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationArgsType } from '@app/common/models/inputs';

import { GetListUserCollectionResultsType } from '../models/results/get-list-user-collection-results.type';
import { GetUserCollectionResultsType } from '../models/results/get-user-collection-results.type';
import { UserCollectionService } from '../services/user-collection.service';

import {
    UserCollectionQueryType,
    UserCollectionRootResolver,
} from './user-collection-root.resolver';
import { GetMarkdownCollectionResultsType } from '../models/results/get-markdown-collection-results.type';
import { GetMarkdownCollectionArgsType } from '../models/inputs/get-markdown-collection-args.type';
import { GetUserCollectionArgsType } from '../models/inputs';

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
        @Args() args: PaginationArgsType,
        @Args() input: GetUserCollectionArgsType,
    ): Promise<GetListUserCollectionResultsType> {
        return await this.userCollectionService.getUserCollectionList(
            args,
            input,
        );
    }

    @ResolveField(() => GetListUserCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getUserCollectionListByProfileId(
        @ProfileId() profileId: string,
        @Args('id', { nullable: true }) id: string,
        @Args() input: GetUserCollectionArgsType,
        @Args() args: PaginationArgsType,
    ): Promise<GetListUserCollectionResultsType> {
        return this.userCollectionService.getUserCollectionListByProfileId(
            id ?? profileId,
            args,
            input
        );
    }

    @ResolveField(() => GetMarkdownCollectionResultsType, {
        middleware: [AuthMiddleware]
    })
    @UseGuards(JwtAuthGuard)
    async getMarkdown(
        @Args() args: GetMarkdownCollectionArgsType,
        @AccessToken() userId: string
    ) {
        return await this.userCollectionService.getMarkdownCollection(args, userId);
    }
}
