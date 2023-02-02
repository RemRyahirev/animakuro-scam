import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateUserProfileResultsType } from '../models/results/create-user-profile-results.type';
import { UpdateUserProfileResultsType } from '../models/results/update-user-profile-results.type';
import { DeleteUserProfileResultsType } from '../models/results/delete-user-profile-results.type';
import { GetListUserProfileResultsType } from '../models/results/get-list-user-profile-results.type';
import { GetUserProfileResultsType } from '../models/results/get-user-profile-results.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards';

@ObjectType()
export class UserProfileMutationType {
    @Field(() => CreateUserProfileResultsType, {
        description: 'Create user profile',
    })
    createUserProfile: CreateUserProfileResultsType;

    @Field(() => UpdateUserProfileResultsType, {
        description: 'Update user profile',
    })
    updateUserProfile: UpdateUserProfileResultsType;

    @Field(() => DeleteUserProfileResultsType, {
        description: 'Delete user profile',
    })
    deleteUserProfile: DeleteUserProfileResultsType;
}

@ObjectType()
export class UserProfileQueryType {
    @Field(() => GetUserProfileResultsType, {
        description: 'Get user profile by ID',
    })
    getUserProfile: GetUserProfileResultsType;

    @Field(() => GetListUserProfileResultsType, {
        description: 'Get user profile list',
    })
    getUserProfileList: GetListUserProfileResultsType;
}

@Resolver()
export class UserProfileRootResolver {
    @Mutation(() => UserProfileMutationType, {
        description: 'User Profile mutations',
    })
    @UseGuards(JwtAuthGuard)
    userProfileMutations() {
        return {};
    }

    @Query(() => UserProfileQueryType, { description: 'User Profile queries' })
    @UseGuards(JwtAuthGuard)
    userProfileQueries() {
        return {};
    }
}
