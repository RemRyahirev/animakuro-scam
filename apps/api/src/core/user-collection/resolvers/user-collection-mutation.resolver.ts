import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { ProfileId } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { CreateUserCollectionInputType } from '../models/inputs/create-user-collection-input.type';
import { CreateUserCollectionResultsType } from '../models/results/create-user-collection-results.type';
import { UpdateUserCollectionResultsType } from '../models/results/update-user-collection-results.type';
import { UpdateUserCollectionInputType } from '../models/inputs/update-user-collection-input.type';
import { DeleteUserCollectionResultsType } from '../models/results/delete-user-collection-results.type';
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
    ): Promise<UpdateUserCollectionResultsType> {
        return await this.userCollectionService.updateUserCollection(args);
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
}
