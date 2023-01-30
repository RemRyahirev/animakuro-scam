import {
    ProfileFavouritesMutationType,
    ProfileFavouritesRootResolver,
} from './profile-favourites-root.resolver';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateProfileFavouritesResultsType } from '../models/results/create-profile-favourites-results.type';
import { CreateProfileFavouritesInputType } from '../models/inputs/create-profile-favourites-input.type';
import { UpdateProfileFavouritesResultsType } from '../models/results/update-profile-favourites-results.type';
import { UpdateProfileFavouritesInputType } from '../models/inputs/update-profile-settings-input.type';
import { DeleteProfileFavouritesResultsType } from '../models/results/delete-profile-favourites-results.type';
import { ProfileFavouritesService } from '../services/profile-favourites.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

//@UseGuards(JwtAuthGuard)
@Resolver(ProfileFavouritesMutationType)
export class ProfileFavouritesMutationResolver extends ProfileFavouritesRootResolver {
    constructor(private profileFavouritesService: ProfileFavouritesService) {
        super();
    }

    @ResolveField(() => CreateProfileFavouritesResultsType)
    async createProfileFavourites(
        @Args() args: CreateProfileFavouritesInputType,
    ): Promise<CreateProfileFavouritesResultsType> {
        return await this.profileFavouritesService.createProfileFavourites(
            args,
        );
    }

    @ResolveField(() => UpdateProfileFavouritesResultsType)
    async updateProfileFavourites(
        @Args() args: UpdateProfileFavouritesInputType,
    ): Promise<UpdateProfileFavouritesResultsType> {
        return await this.profileFavouritesService.updateProfileFavourites(
            args,
        );
    }

    @ResolveField(() => DeleteProfileFavouritesResultsType)
    async deleteProfileFavourites(
        @Args('id') id: string,
    ): Promise<DeleteProfileFavouritesResultsType> {
        return await this.profileFavouritesService.deleteProfileFavourites(id);
    }
}
