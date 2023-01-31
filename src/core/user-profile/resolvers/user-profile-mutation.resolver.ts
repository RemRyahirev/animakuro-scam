import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserProfileInputType } from '../models/inputs/create-user-profile-input.type';
import {
    UserProfileMutationType,
    UserProfileRootResolver,
} from './user-profile-root.resolver';
import { CreateUserProfileResultsType } from '../models/results/create-user-profile-results.type';
import { UpdateUserProfileResultsType } from '../models/results/update-user-profile-results.type';
import { UpdateUserProfileInputType } from '../models/inputs/update-user-profile-input.type';
import { DeleteUserProfileResultsType } from '../models/results/delete-user-profile-results.type';
import { UserProfileService } from '../services/user-profile.service';
import { UpdateProfileFavouritesInputType } from '../models/inputs/update-profile-favourites-input.type';

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
    async updateUserProfile(
        @Args() args: UpdateUserProfileInputType,
    ): Promise<UpdateUserProfileResultsType> {
        return await this.userProfileService.updateUserProfile(args);
    }

    @ResolveField(() => UpdateUserProfileResultsType)
    async updateProfileFavourites(
        @Args() args: UpdateProfileFavouritesInputType,
    ): Promise<UpdateUserProfileResultsType> {
        return await this.userProfileService.updateProfileFavourites(args);
    }

    @ResolveField(() => DeleteUserProfileResultsType)
    async deleteUserProfile(
        @Args('id') id: string,
    ): Promise<DeleteUserProfileResultsType> {
        return await this.userProfileService.deleteUserProfile(id);
    }
}
