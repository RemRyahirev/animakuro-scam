import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken, ProfileId } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import {
    UpdateUserProfileInputType,
    UpdateUserFavouriteAnimeInputType,
    CreateUserProfileInputType,
    UpdateUserFavouriteStudiosInputType,
    UpdateUserFavouriteAuthorsInputType,
    UpdateUserFavouriteGenresInputType,
    UpdateUserFavouriteCharactersInputType,
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
} from '../models/results';
import { UserProfileService } from '../services/user-profile.service';

import {
    UserProfileMutationType,
    UserProfileRootResolver,
} from './user-profile-root.resolver';

@Resolver(UserProfileMutationType)
export class UserProfileMutationResolver extends UserProfileRootResolver {
    constructor(private userProfileService: UserProfileService) {
        super();
    }

    @ResolveField(() => CreateUserProfileResultsType, {
        middleware: [AuthMiddleware],
    })
    async createUserProfile(
        @Args() args: CreateUserProfileInputType,
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
        @Args() args: UpdateUserProfileInputType,
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
        @Args() args: UpdateUserFavouriteAnimeInputType,
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
        @Args() args: UpdateUserFavouriteAuthorsInputType,
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
        @Args() args: UpdateUserFavouriteCharactersInputType,
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
        @Args() args: UpdateUserFavouriteGenresInputType,
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
        @Args() args: UpdateUserFavouriteStudiosInputType,
    ): Promise<UpdateUserFavouriteStudiosResultType> {
        return await this.userProfileService.updateFavouriteStudios(
            args,
            profileId,
        );
    }
}
