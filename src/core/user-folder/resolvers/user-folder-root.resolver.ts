import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateUserFolderResultsType } from '../models/results/create-user-folder-results.type';
import { UpdateUserFolderResultsType } from '../models/results/update-user-folder-results.type';
import { DeleteUserFolderResultsType } from '../models/results/delete-user-folder-results.type';
import { GetListUserFolderResultsType } from '../models/results/get-list-user-folder-results.type';
import { GetUserFolderResultsType } from '../models/results/get-user-folder-results.type';

@ObjectType()
export class UserFolderMutationType {
    @Field(() => CreateUserFolderResultsType, {
        description: 'Create User Folder',
    })
    createUserFolder: CreateUserFolderResultsType;

    @Field(() => UpdateUserFolderResultsType, {
        description: 'Update User Folder',
    })
    updateUserFolder: UpdateUserFolderResultsType;

    @Field(() => DeleteUserFolderResultsType, {
        description: 'Delete User Folder',
    })
    deleteUserFolder: DeleteUserFolderResultsType;
}

@ObjectType()
export class UserFolderQueryType {
    @Field(() => GetUserFolderResultsType, {
        description: 'Get User Folder by ID',
    })
    getUserFolder: GetUserFolderResultsType;

    @Field(() => GetListUserFolderResultsType, {
        description: 'Get User Folder list',
    })
    getUserFolderList: GetListUserFolderResultsType;
}

@Resolver()
export class UserFolderRootResolver {
    @Mutation(() => UserFolderMutationType, {
        description: 'User Folder mutations',
    })
    userFolderMutations() {
        return {};
    }

    @Query(() => UserFolderQueryType, {
        description: 'User Folder queries',
    })
    userFolderQueries() {
        return {};
    }
}
