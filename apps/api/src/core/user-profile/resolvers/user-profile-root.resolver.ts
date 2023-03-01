import { UseGuards } from '@nestjs/common';
import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '@app/common/guards';

import {
    GetListUserProfileResultsType,
    CreateUserProfileResultsType,
    UpdateUserProfileResultsType,
    DeleteUserProfileResultsType,
    GetUserProfileResultsType,
    UpdateUserFavouriteAnimesResultType,
    UpdateUserFavouriteAuthorsResultType,
    UpdateUserFavouriteCharactersResultType,
    UpdateUserFavouriteGenresResultType,
    UpdateUserFavouriteStudiosResultType,
    UpdateUserFavouriteCollectionsResultType,
} from '../models/results';

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

    @Field(() => UpdateUserFavouriteAnimesResultType, {
        description: 'Update user Favourites by Animes',
    })
    updateFavouriteAnimes: UpdateUserFavouriteAnimesResultType;

    @Field(() => UpdateUserFavouriteAuthorsResultType, {
        description: 'Update user Favourites by Authors',
    })
    updateFavouriteAuthors: UpdateUserFavouriteAuthorsResultType;

    @Field(() => UpdateUserFavouriteCharactersResultType, {
        description: 'Update user Favourites by Charecters',
    })
    updateFavouriteCharacters: UpdateUserFavouriteCharactersResultType;

    @Field(() => UpdateUserFavouriteGenresResultType, {
        description: 'Update user Favourites by Genres',
    })
    updateFavouriteGenres: UpdateUserFavouriteGenresResultType;

    @Field(() => UpdateUserFavouriteStudiosResultType, {
        description: 'Update user Favourites by Studios',
    })
    updateFavouriteStudios: UpdateUserFavouriteStudiosResultType;

    @Field(() => UpdateUserFavouriteCollectionsResultType, {
        description: 'Update user Favourites by Collections',
    })
    updateFavouriteCollections: UpdateUserFavouriteCollectionsResultType;
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
