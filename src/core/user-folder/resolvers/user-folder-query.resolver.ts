import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    UserFolderQueryType,
    UserFolderRootResolver,
} from './user-folder-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserFolderResultsType } from '../models/results/get-list-user-folder-results.type';
import { GetUserFolderResultsType } from '../models/results/get-user-folder-results.type';
import { UserFolderService } from '../services/user-folder.service';

@Resolver(UserFolderQueryType)
export class UserFolderQueryResolver extends UserFolderRootResolver {
    constructor(private userFolderService: UserFolderService) {
        super();
    }

    @ResolveField(() => GetUserFolderResultsType)
    async getUserFolder(
        @Args('id') id: string,
    ): Promise<GetUserFolderResultsType> {
        return await this.userFolderService.getUserFolder(id);
    }

    @ResolveField(() => GetListUserFolderResultsType)
    async getUserFolderList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserFolderResultsType> {
        return await this.userFolderService.getUserFolderList(args);
    }
}
