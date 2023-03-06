import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken, ProfileId } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import {
    UpdateUserProfileArgsType,
    UpdateUserFavouriteAnimeArgsType,
    CreateUserProfileArgsType,
    UpdateUserFavouriteStudiosArgsType,
    UpdateUserFavouriteAuthorsArgsType,
    UpdateUserFavouriteGenresArgsType,
    UpdateUserFavouriteCharactersArgsType,
    UpdateUserFavouriteCollectionsArgsType,
} from '../models/inputs';
import {
    CreateUserProfileResultsType,
    UpdateUserProfileResultsType,
    DeleteUserProfileResultsType,
    UpdateUserFavouriteAnimesResultType,
    UpdateUserFavouriteAuthorsResultType,
    UpdateUserFavouriteCharactersResultType,
    UpdateUserFavouriteGenresResultType,
    UpdateUserFavouriteStudiosResultType,
    UpdateUserFavouriteCollectionsResultType,
} from '../models/results';
import { UserProfileService } from '../services/user-profile.service';

import {
    UserProfileMutationType,
    UserProfileRootResolver,
} from './user-profile-root.resolver';
import { AddHistoryAnimeResultsType } from '../models/results/add-history-anime-results.type';
import { AddHistoryAnimeArgsType } from '../models/inputs/add-history-anime-args.type';
import { AddHistoryCharacterResultsType } from '../models/results/add-history-character-results.type';
import { AddHistoryCharacterArgsType } from '../models/inputs/add-history-character-args.type';
import { AddHistoryAuthorArgs } from '../models/inputs/add-history-author.args';
import { AddHistoryAuthorResultsType } from '../models/results/add-history-author-results.type';

@Resolver(UserProfileMutationType)
export class UserProfileMutationResolver extends UserProfileRootResolver {
    constructor(private userProfileService: UserProfileService) {
        super();
    }

    @ResolveField(() => CreateUserProfileResultsType, {
        middleware: [AuthMiddleware],
    })
    async createUserProfile(
        @Args() args: CreateUserProfileArgsType,
        @AccessToken() user_id: string,
    ): Promise<CreateUserProfileResultsType> {
        return await this.userProfileService.createUserProfile(
            {
                ...args,
                user_id: args.user_id ?? user_id,
            },
            user_id,
        );
    }

    @ResolveField(() => UpdateUserProfileResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateUserProfile(
        @Args() args: UpdateUserProfileArgsType,
        @AccessToken() user_id: string,
    ): Promise<UpdateUserProfileResultsType> {
        return await this.userProfileService.updateUserProfile(args, user_id);
    }

    @ResolveField(() => DeleteUserProfileResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteUserProfile(
        @Args('id') id: string,
    ): Promise<DeleteUserProfileResultsType> {
        return await this.userProfileService.deleteUserProfile(id);
    }

    @ResolveField(() => UpdateUserFavouriteAnimesResultType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateFavouriteAnimes(
        @ProfileId() profileId: string,
        @Args() args: UpdateUserFavouriteAnimeArgsType,
    ): Promise<UpdateUserFavouriteAnimesResultType> {
        return await this.userProfileService.updateFavouriteAnimes(
            args,
            profileId,
        );
    }

    @ResolveField(() => UpdateUserFavouriteAuthorsResultType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateFavouriteAuthors(
        @ProfileId() profileId: string,
        @Args() args: UpdateUserFavouriteAuthorsArgsType,
    ): Promise<UpdateUserFavouriteAuthorsResultType> {
        return await this.userProfileService.updateFavouriteAuthors(
            args,
            profileId,
        );
    }

    @ResolveField(() => UpdateUserFavouriteCharactersResultType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateFavouriteCharacters(
        @ProfileId() profileId: string,
        @Args() args: UpdateUserFavouriteCharactersArgsType,
    ): Promise<UpdateUserFavouriteCharactersResultType> {
        return await this.userProfileService.updateFavouriteCharacters(
            args,
            profileId,
        );
    }

    @ResolveField(() => UpdateUserFavouriteGenresResultType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateFavouriteGenres(
        @ProfileId() profileId: string,
        @Args() args: UpdateUserFavouriteGenresArgsType,
    ): Promise<UpdateUserFavouriteGenresResultType> {
        return await this.userProfileService.updateFavouriteGenres(
            args,
            profileId,
        );
    }

    @ResolveField(() => UpdateUserFavouriteStudiosResultType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateFavouriteStudios(
        @ProfileId() profileId: string,
        @Args() args: UpdateUserFavouriteStudiosArgsType,
    ): Promise<UpdateUserFavouriteStudiosResultType> {
        return await this.userProfileService.updateFavouriteStudios(
            args,
            profileId,
        );
    }

    @ResolveField(() => UpdateUserFavouriteStudiosResultType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateFavouriteCollections(
        @ProfileId() profileId: string,
        @Args() args: UpdateUserFavouriteCollectionsArgsType,
    ): Promise<UpdateUserFavouriteCollectionsResultType> {
        return await this.userProfileService.updateFavouriteCollections(
            args,
            profileId,
        );
    }

    @ResolveField(() => AddHistoryAnimeResultsType, {
        middleware: [AuthMiddleware]
    })
    @UseGuards(JwtAuthGuard)
    async addHistoryAnime(
        @Args() args: AddHistoryAnimeArgsType,
        @ProfileId() profileId: string,
    ): Promise<AddHistoryAnimeResultsType> {
        return await this.userProfileService.addHistoryAnime(args, profileId);
    }

    @ResolveField(() => AddHistoryCharacterResultsType, {
        middleware: [AuthMiddleware]
    })
    @UseGuards(JwtAuthGuard)
    async addHistoryCharacter(
        @Args() args: AddHistoryCharacterArgsType,
        @ProfileId() profileId: string,
    ): Promise<AddHistoryCharacterResultsType> {
        return await this.userProfileService.addHistoryCharacter(args, profileId);
    }

    @ResolveField(() => AddHistoryAuthorResultsType, {
        middleware: [AuthMiddleware]
    })
    @UseGuards(JwtAuthGuard)
    async addHistoryAuthor(
        @Args() args: AddHistoryAuthorArgs,
        @ProfileId() profileId: string,
    ): Promise<AddHistoryAuthorResultsType> {
        return await this.userProfileService.addHistoryAuthor(args, profileId);
    }
}
