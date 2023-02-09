import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    UserProfileMutationType,
    UserProfileRootResolver,
} from './user-profile-root.resolver';
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
import { JwtAuthGuard } from '../../../common/guards';
import { AccessToken } from '../../../common/decorators';
import { UseGuards } from '@nestjs/common';

@Resolver(UserProfileMutationType)
export class UserProfileMutationResolver extends UserProfileRootResolver {
    constructor(private userProfileService: UserProfileService) {
        super();
    }

    @ResolveField(() => CreateUserProfileResultsType)
    async createUserProfile(
        @Args() args: CreateUserProfileInputType,
    ): Promise<CreateUserProfileResultsType> {
        return await this.userProfileService.createUserProfile(args);
    }

    @ResolveField(() => UpdateUserProfileResultsType)
    @UseGuards(JwtAuthGuard)
    async updateUserProfile(
        @AccessToken() user_id: string,
        @Args() args: UpdateUserProfileInputType,
    ): Promise<UpdateUserProfileResultsType> {
        return await this.userProfileService.updateUserProfile({
            ...args,
        });
    }

    @ResolveField(() => DeleteUserProfileResultsType)
    @UseGuards(JwtAuthGuard)
    async deleteUserProfile(
        @AccessToken() user_id: string,
        // @Args('id') id: string,
    ): Promise<DeleteUserProfileResultsType> {
        return await this.userProfileService.deleteUserProfile(user_id);
    }

    @ResolveField(() => UpdateUserFavouriteAnimesResultType)
    @UseGuards(JwtAuthGuard)
    async updateFavouriteAnimes(
        @AccessToken() user_id: string,
        @Args() args: UpdateUserFavouriteAnimeInputType,
    ): Promise<UpdateUserFavouriteAnimesResultType> {
        return await this.userProfileService.updateFavouriteAnimes(
            args,
            user_id,
        );
    }

    @ResolveField(() => UpdateUserFavouriteAuthorsResultType)
    @UseGuards(JwtAuthGuard)
    async updateFavouriteAuthors(
        @AccessToken() user_id: string,
        @Args() args: UpdateUserFavouriteAuthorsInputType,
    ): Promise<UpdateUserFavouriteAuthorsResultType> {
        return await this.userProfileService.updateFavouriteAuthors(
            args,
            user_id,
        );
    }

    @ResolveField(() => UpdateUserFavouriteCharactersResultType)
    @UseGuards(JwtAuthGuard)
    async updateFavouriteCharacters(
        @AccessToken() user_id: string,
        @Args() args: UpdateUserFavouriteCharactersInputType,
    ): Promise<UpdateUserFavouriteCharactersResultType> {
        return await this.userProfileService.updateFavouriteCharacters(
            args,
            user_id,
        );
    }

    @ResolveField(() => UpdateUserFavouriteGenresResultType)
    @UseGuards(JwtAuthGuard)
    async updateFavouriteGenres(
        @AccessToken() user_id: string,
        @Args() args: UpdateUserFavouriteGenresInputType,
    ): Promise<UpdateUserFavouriteGenresResultType> {
        return await this.userProfileService.updateFavouriteGenres(
            args,
            user_id,
        );
    }

    @ResolveField(() => UpdateUserFavouriteStudiosResultType)
    @UseGuards(JwtAuthGuard)
    async updateFavouriteStudios(
        @AccessToken() user_id: string,
        @Args() args: UpdateUserFavouriteStudiosInputType,
    ): Promise<UpdateUserFavouriteStudiosResultType> {
        return await this.userProfileService.updateFavouriteStudios(
            args,
            user_id,
        );
    }
}
