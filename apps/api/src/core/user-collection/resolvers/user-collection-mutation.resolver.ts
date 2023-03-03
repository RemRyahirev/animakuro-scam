import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { ProfileId } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import {
    CreateUserCollectionResultsType,
    UpdateRatingUserCollectionResultsType,
    DeleteUserCollectionResultsType,
    UpdateUserCollectionResultsType,
} from '../models/results';

import {
    UpdateUserCollectionInputType,
    UpdateRatingUserCollectionInputType,
    CreateUserCollectionInputType,
} from '../models/inputs';

import { UserCollectionService } from '../services/user-collection.service';

import {
    UserCollectionMutationType,
    UserCollectionRootResolver,
} from './user-collection-root.resolver';

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
        @Args() args: CreateUserCollectionInputType,
        @ProfileId() profileId: string,
    ): Promise<CreateUserCollectionResultsType> {
        return await this.userCollectionService.createUserCollection(
            args,
            profileId,
        );
    }

    @ResolveField(() => UpdateUserCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateUserCollection(
        @Args() args: UpdateUserCollectionInputType,
        @AccessToken() user_id: string,
    ): Promise<UpdateUserCollectionResultsType> {
        return await this.userCollectionService.updateUserCollection(
            args,
            user_id,
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

    @ResolveField(() => UpdateRatingUserCollectionResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateRatingUserCollection(
        @Args() args: UpdateRatingUserCollectionInputType,
        @AccessToken() user_id: string,
    ): Promise<UpdateRatingUserCollectionResultsType> {
        return await this.userCollectionService.updateRatingUserCollection({
            ...args,
            user_id,
        });
    }
}
