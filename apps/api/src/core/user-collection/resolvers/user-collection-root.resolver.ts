import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { CreateUserCollectionResultsType } from '../models/results/create-user-collection-results.type';
import { UpdateUserCollectionResultsType } from '../models/results/update-user-collection-results.type';
import { DeleteUserCollectionResultsType } from '../models/results/delete-user-collection-results.type';
import { GetListUserCollectionResultsType } from '../models/results/get-list-user-collection-results.type';
import { GetUserCollectionResultsType } from '../models/results/get-user-collection-results.type';
import { CreateMarkdownCollectionResultsType } from '../models/results/create-markdown-collection-results.type';
import { GetMarkdownCollectionResultsType } from '../models/results/get-markdown-collection-results.type';

@ObjectType()
export class UserCollectionMutationType {
    @Field(() => CreateUserCollectionResultsType, {
        description: 'Create User Collection',
    })
    createUserCollection: CreateUserCollectionResultsType;

    @Field(() => UpdateUserCollectionResultsType, {
        description: 'Update User Collection',
    })
    updateUserCollection: UpdateUserCollectionResultsType;

    @Field(() => DeleteUserCollectionResultsType, {
        description: 'Delete User Collection',
    })
    deleteUserCollection: DeleteUserCollectionResultsType;

    @Field(() => CreateMarkdownCollectionResultsType, {
        description: 'Create user\'s collection markdown'
    })
    createMarkdown: CreateMarkdownCollectionResultsType
}

@ObjectType()
export class UserCollectionQueryType {
    @Field(() => GetUserCollectionResultsType, {
        description: 'Get User Collection by ID',
    })
    getUserCollection: GetUserCollectionResultsType;

    @Field(() => GetListUserCollectionResultsType, {
        description: 'Get User Collection list',
    })
    getUserCollectionList: GetListUserCollectionResultsType;

    @Field(() => GetListUserCollectionResultsType, {
        description: 'Get User Collection List by user_id',
    })
    getUserCollectionListByUserId: GetListUserCollectionResultsType;

    @Field(() => GetMarkdownCollectionResultsType, {
        description: 'Get markdown collection by user'
    })
    getMarkdown: GetMarkdownCollectionResultsType
}

@Resolver()
export class UserCollectionRootResolver {
    @Mutation(() => UserCollectionMutationType, {
        description: 'User Collection mutations',
    })
    userCollectionMutations() {
        return {};
    }

    @Query(() => UserCollectionQueryType, {
        description: 'User Collection queries',
    })
    userCollectionQueries() {
        return {};
    }
}
