import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    ProfileFolderQueryType,
    ProfileFolderRootResolver,
} from './profile-folder-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListProfileFolderResultsType } from '../models/results/get-list-profile-folder-results.type';
import { GetProfileFolderResultsType } from '../models/results/get-profile-folder-results.type';
import { ProfileFolderService } from '../services/profile-folder.service';

@Resolver(ProfileFolderQueryType)
export class ProfileFolderQueryResolver extends ProfileFolderRootResolver {
    constructor(private profileFolderService: ProfileFolderService) {
        super();
    }

    @ResolveField(() => GetProfileFolderResultsType)
    async getProfileFolder(
        @Args('id') id: string,
    ): Promise<GetProfileFolderResultsType> {
        return await this.profileFolderService.getProfileFolder(id);
    }

    @ResolveField(() => GetListProfileFolderResultsType)
    async getProfileFolderList(
        @Args() args: PaginationInputType,
    ): Promise<GetListProfileFolderResultsType> {
        return await this.profileFolderService.getProfileFolderList(args);
    }
}
