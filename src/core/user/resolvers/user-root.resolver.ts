import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { GetListUserResultsType } from '../models/results/get-list-user-results.type';
import { UpdateUserResultsType } from '../models/results/update-user-results.type';
import { CreateUserResultsType } from '../models/results/create-user-results.type';
import { GetUserResultsType } from '../models/results/get-user-results.type';
import { GetListUserByEmailResultsType } from '../models/results/get-list-user-by-email-results.type';

@ObjectType()
export class UserMutationType {
    @Field(() => CreateUserResultsType, { description: 'Create user' })
    createUser: CreateUserResultsType;

    @Field(() => UpdateUserResultsType, { description: 'Update user' })
    updateUser: UpdateUserResultsType;
}

@ObjectType()
export class UserQueryType {
    @Field(() => GetUserResultsType, { description: 'Get user' })
    getUser: GetUserResultsType;

    @Field(() => GetListUserByEmailResultsType, {
        nullable: true,
        description: 'Get user list by email',
    })
    getUsersByEmail: GetListUserByEmailResultsType;

    @Field(() => GetListUserResultsType, { description: 'Get user list' })
    getUserList: GetListUserResultsType;

    @Field(() => GetUserResultsType, { description: 'Get user by ID' })
    getUserById: GetUserResultsType;
}

@Resolver()
export class UserRootResolver {
    @Mutation(() => UserMutationType, { description: 'User mutations' })
    userMutations() {
        return {};
    }

    @Query(() => UserQueryType, { description: 'User queries' })
    userQueries() {
        return {};
    }
}
