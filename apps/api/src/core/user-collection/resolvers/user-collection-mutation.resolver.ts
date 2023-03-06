import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken, ProfileId } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import {
    CreateUserCollectionResultsType,
    UpdateRatingUserCollectionResultsType,
    DeleteUserCollectionResultsType,
    UpdateUserCollectionResultsType,
} from '../models/results';

import {
    UpdateUserCollectionArgsType,
    UpdateRatingUserCollectionArgsType,
    CreateUserCollectionArgsType,
} from '../models/inputs';

import { UserCollectionService } from '../services/user-collection.service';

import {
    UserCollectionMutationType,
    UserCollectionRootResolver,
} from './user-collection-root.resolver';
import { CreateMarkdownCollectionResultsType } from '../models/results/create-markdown-collection-results.type';
import { CreateMarkdownCollectionArgsType } from '../models/inputs/create-markdown-collection-args.type';
import { UpdateMarkdownCollectionArgsType } from '../models/inputs/update-markdown-collection-args.type';

@Resolver(UserCollectionMutationType)
export class UserCollectionMutationResolver extends UserCollectionRootResolver {
    constructor(private userCollectionService: UserCollectionService) {
        super();
    }

    @ResolveField(() => CreateUserCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async createUserCollection(
        @Args() args: CreateUserCollectionArgsType,
        @ProfileId() profileId: string,
        @AccessToken() userId: string,
    ): Promise<CreateUserCollectionResultsType> {
        return await this.userCollectionService.createUserCollection(
            args,
            profileId,
            userId,
        );
    }

    @ResolveField(() => UpdateUserCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateUserCollection(
        @Args() args: UpdateUserCollectionArgsType,
        @ProfileId() profileId: string,
        @AccessToken() userId: string,
    ): Promise<UpdateUserCollectionResultsType> {
        return await this.userCollectionService.updateUserCollection(
            args,
            profileId,
            userId,
        );
    }

    @ResolveField(() => DeleteUserCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteUserCollection(
        @Args('id') id: string,
    ): Promise<DeleteUserCollectionResultsType> {
        return await this.userCollectionService.deleteUserCollection(id);
    }

    @ResolveField(() => CreateMarkdownCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async createMarkdown(
        @Args() args: CreateMarkdownCollectionArgsType,
        // @ProfileId() user_profile_id: string,
        @AccessToken() userId: string
    ) {
        return await this.userCollectionService.createMarkdownCollection(args, userId);
    }

    @ResolveField(() => CreateMarkdownCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateMarkdown(
        @Args() args: UpdateMarkdownCollectionArgsType,
        // @ProfileId() user_profile_id: string,
        @AccessToken() userId: string
    ) {
        return await this.userCollectionService.updateMarkdownCollection(args, userId)
    }

    @ResolveField(() => UpdateRatingUserCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateRatingUserCollection(
        @Args() args: UpdateRatingUserCollectionArgsType,
        @ProfileId() user_profile_id: string,
    ): Promise<UpdateRatingUserCollectionResultsType> {
        return await this.userCollectionService.updateRatingUserCollection({
            ...args,
            user_profile_id,
        });
    }
}
