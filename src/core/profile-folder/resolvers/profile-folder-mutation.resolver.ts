import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateProfileFolderInputType } from '../models/inputs/create-profile-folder-input.type';
import {
    ProfileFolderMutationType,
    ProfileFolderRootResolver,
} from './profile-folder-root.resolver';
import { CreateProfileFolderResultsType } from '../models/results/create-profile-folder-results.type';
import { UpdateProfileFolderResultsType } from '../models/results/update-profile-folder-results.type';
import { UpdateProfileFolderInputType } from '../models/inputs/update-profile-folder-input.type';
import { DeleteProfileFolderResultsType } from '../models/results/delete-profile-folder-results.type';
import { ProfileFolderService } from '../services/profile-folder.service';

@Resolver(ProfileFolderMutationType)
export class ProfileFolderMutationResolver extends ProfileFolderRootResolver {
    constructor(private profileFolderService: ProfileFolderService) {
        super();
    }

    @ResolveField(() => CreateProfileFolderResultsType)
    async createProfileFolder(
        @Args() args: CreateProfileFolderInputType,
    ): Promise<CreateProfileFolderResultsType> {
        return await this.profileFolderService.createProfileFolder(args);
    }

    @ResolveField(() => UpdateProfileFolderResultsType)
    async updateProfileFolder(
        @Args() args: UpdateProfileFolderInputType,
    ): Promise<UpdateProfileFolderResultsType> {
        return await this.profileFolderService.updateProfileFolder(args);
    }

    @ResolveField(() => DeleteProfileFolderResultsType)
    async deleteProfileFolder(
        @Args('id') id: string,
    ): Promise<DeleteProfileFolderResultsType> {
        return await this.profileFolderService.deleteProfileFolder(id);
    }
}
