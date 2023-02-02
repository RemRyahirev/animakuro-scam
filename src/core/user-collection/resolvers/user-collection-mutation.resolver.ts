import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserCollectionInputType } from '../models/inputs/create-user-collection-input.type';
import {
    UserCollectionMutationType,
    UserCollectionRootResolver,
} from './user-collection-root.resolver';
import { CreateUserCollectionResultsType } from '../models/results/create-user-collection-results.type';
import { UpdateUserCollectionResultsType } from '../models/results/update-user-collection-results.type';
import { UpdateUserCollectionInputType } from '../models/inputs/update-user-collection-input.type';
import { DeleteUserCollectionResultsType } from '../models/results/delete-user-collection-results.type';
import { UserCollectionService } from '../services/user-collection.service';

@Resolver(UserCollectionMutationType)
export class UserCollectionMutationResolver extends UserCollectionRootResolver {
    constructor(private userCollectionService: UserCollectionService) {
        super();
    }

    @ResolveField(() => CreateUserCollectionResultsType)
    async createUserCollection(
        @Args() args: CreateUserCollectionInputType,
    ): Promise<CreateUserCollectionResultsType> {
        return await this.userCollectionService.createUserCollection(args);
    }

    @ResolveField(() => UpdateUserCollectionResultsType)
    async updateUserCollection(
        @Args() args: UpdateUserCollectionInputType,
    ): Promise<UpdateUserCollectionResultsType> {
        return await this.userCollectionService.updateUserCollection(args);
    }

    @ResolveField(() => DeleteUserCollectionResultsType)
    async deleteUserCollection(
        @Args('id') id: string,
    ): Promise<DeleteUserCollectionResultsType> {
        return await this.userCollectionService.deleteUserCollection(id);
    }
}
