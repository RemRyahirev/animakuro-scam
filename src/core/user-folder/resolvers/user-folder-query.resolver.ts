import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    UserFolderQueryType,
    UserFolderRootResolver,
} from './user-folder-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListUserFolderResultsType } from '../models/results/get-list-user-folder-results.type';
import { GetUserFolderResultsType } from '../models/results/get-user-folder-results.type';
import { UserFolderService } from '../services/user-folder.service';
import { GetUserFolderByUserIdResultsType } from '../models/results/get-user-folder-by-user-id-results.type';
import { AccessToken } from 'common/decorators';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards';

@Resolver(UserFolderQueryType)
export class UserFolderQueryResolver extends UserFolderRootResolver {
    constructor(private userFolderService: UserFolderService) {
        super();
    }

    @ResolveField(() => GetUserFolderResultsType)
    @UseGuards(JwtAuthGuard)
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

    @ResolveField(() => GetUserFolderByUserIdResultsType)
    async getUserFolderByUserId(
        @AccessToken() user_id: string,
        @Args('id', { nullable: true }) id?: string,
    ): Promise<GetUserFolderByUserIdResultsType> {
        return await this.userFolderService.getUserFolderByUserId(
            id ?? user_id,
        );
    }
}
