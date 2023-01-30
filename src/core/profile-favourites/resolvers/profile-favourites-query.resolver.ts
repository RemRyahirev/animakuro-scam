import {
    ProfileFavouritesQueryType,
    ProfileFavouritesRootResolver,
} from './profile-favourites-root.resolver';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { GetProfileFavouritesByIdResultsType } from '../models/results/get-profile-favourites-by-id-results.type';
import { ProfileFavouritesService } from '../services/profile-favourites.service';
import { GetListProfileFavouritesResultsType } from '../models/results/get-list-profile-favourites-results.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetProfileFavouritesResultsType } from '../models/results/get-profile-favourites-results.type';

// @UseGuards(JwtAuthGuard)
@Resolver(ProfileFavouritesQueryType)
export class ProfileFavouritesQueryResolver extends ProfileFavouritesRootResolver {
    constructor(private profileFavouritesService: ProfileFavouritesService) {
        super();
    }

    @ResolveField(() => GetProfileFavouritesResultsType)
    async getProfileFavourites(
        @Args('profile_id') profile_id: string,
    ): Promise<GetProfileFavouritesResultsType> {
        return await this.profileFavouritesService.getProfileFavourites(
            profile_id,
        );
    }

    @ResolveField(() => GetProfileFavouritesByIdResultsType)
    async getProfileFavouritesById(
        @Args('id') id: string,
    ): Promise<GetProfileFavouritesByIdResultsType> {
        return await this.profileFavouritesService.getProfileFavouritesById(id);
    }

    @ResolveField(() => GetListProfileFavouritesResultsType)
    async getProfileFavouritesList(
        @Args() args: PaginationInputType,
    ): Promise<GetListProfileFavouritesResultsType> {
        return await this.profileFavouritesService.getProfileFavouritesList(
            args,
        );
    }
}
