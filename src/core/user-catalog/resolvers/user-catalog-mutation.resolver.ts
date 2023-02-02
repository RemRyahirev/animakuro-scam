import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserCatalogInputType } from '../models/inputs/create-user-catalog-input.type';
import {
    UserCatalogMutationType,
    UserCatalogRootResolver,
} from './user-catalog-root.resolver';
import { CreateUserCatalogResultsType } from '../models/results/create-user-catalog-results.type';
import { UpdateUserCatalogResultsType } from '../models/results/update-user-catalog-results.type';
import { UpdateUserCatalogInputType } from '../models/inputs/update-user-catalog-input.type';
import { DeleteUserCatalogResultsType } from '../models/results/delete-user-catalog-results.type';
import { UserCatalogService } from '../services/user-catalog.service';

@Resolver(UserCatalogMutationType)
export class UserCatalogMutationResolver extends UserCatalogRootResolver {
    constructor(private userCatalogService: UserCatalogService) {
        super();
    }

    @ResolveField(() => CreateUserCatalogResultsType)
    async createUserCatalog(
        @Args() args: CreateUserCatalogInputType,
    ): Promise<CreateUserCatalogResultsType> {
        return await this.userCatalogService.createUserCatalog(args);
    }

    @ResolveField(() => UpdateUserCatalogResultsType)
    async updateUserCatalog(
        @Args() args: UpdateUserCatalogInputType,
    ): Promise<UpdateUserCatalogResultsType> {
        return await this.userCatalogService.updateUserCatalog(args);
    }

    @ResolveField(() => DeleteUserCatalogResultsType)
    async deleteUserCatalog(
        @Args('id') id: string,
    ): Promise<DeleteUserCatalogResultsType> {
        return await this.userCatalogService.deleteUserCatalog(id);
    }
}
