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
} from '../models/results';
import { GetHistoryAnimeResultsType } from '../models/results/get-history-anime-results.type';
import { AddHistoryAnimeResultsType } from '../models/results/add-history-anime-results.type';
import { GetHistoryCharacterResultsType } from '../models/results/get-history-character-results.type';
import { GetHistoryAuthorResultsType } from '../models/results/get-history-author-results.type';
import { AddHistoryCharacterResultsType } from '../models/results/add-history-character-results.type';
import { AddHistoryAuthorResultsType } from '../models/results/add-history-author-results.type';

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

    @Field(() => AddHistoryAnimeResultsType, {
        description: 'Add anime history'
    })
    addHistoryAnime: AddHistoryAnimeResultsType

    @Field(() => AddHistoryCharacterResultsType, {
        description: 'Add character history'
    })
    addHistoryCharacter: AddHistoryCharacterResultsType

    @Field(() => AddHistoryAuthorResultsType, {
        description: 'Add author history'
    })
    addHistoryAuthor: AddHistoryAuthorResultsType
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

    @Field(() => GetHistoryAnimeResultsType, {
        description: 'Get anime history'
    })
    getHistoryAnime: GetHistoryAnimeResultsType

    @Field(() => GetHistoryCharacterResultsType, {
        description: 'Get character history'
    })
    getHistoryCharacter: GetHistoryCharacterResultsType

    @Field(() => GetHistoryAuthorResultsType, {
        description: 'Get author history'
    })
    getHistoryAuthor: GetHistoryAuthorResultsType
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
