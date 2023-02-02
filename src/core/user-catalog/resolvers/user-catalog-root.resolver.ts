import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateUserCatalogResultsType } from '../models/results/create-user-catalog-results.type';
import { UpdateUserCatalogResultsType } from '../models/results/update-user-catalog-results.type';
import { DeleteUserCatalogResultsType } from '../models/results/delete-user-catalog-results.type';
import { GetListUserCatalogResultsType } from '../models/results/get-list-user-catalog-results.type';
import { GetUserCatalogResultsType } from '../models/results/get-user-catalog-results.type';

@ObjectType()
export class UserCatalogMutationType {
    @Field(() => CreateUserCatalogResultsType, {
        description: 'Create User Catalog',
    })
    createUserCatalog: CreateUserCatalogResultsType;

    @Field(() => UpdateUserCatalogResultsType, {
        description: 'Update User Catalog',
    })
    updateUserCatalog: UpdateUserCatalogResultsType;

    @Field(() => DeleteUserCatalogResultsType, {
        description: 'Delete User Catalog',
    })
    deleteUserCatalog: DeleteUserCatalogResultsType;
}

@ObjectType()
export class UserCatalogQueryType {
    @Field(() => GetUserCatalogResultsType, {
        description: 'Get User Catalog by ID',
    })
    getUserCatalog: GetUserCatalogResultsType;

    @Field(() => GetListUserCatalogResultsType, {
        description: 'Get User Catalog list',
    })
    getUserCatalogList: GetListUserCatalogResultsType;
}

@Resolver()
export class UserCatalogRootResolver {
    @Mutation(() => UserCatalogMutationType, {
        description: 'User Catalog mutations',
    })
    userCatalogMutations() {
        return {};
    }

    @Query(() => UserCatalogQueryType, {
        description: 'User Catalog queries',
    })
    userCatalogQueries() {
        return {};
    }
}
