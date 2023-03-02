import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken, ProfileId } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationInputType } from '@app/common/models/inputs';

import { GetListUserFolderResultsType } from '../models/results/get-list-user-folder-results.type';
import { GetUserFolderResultsType } from '../models/results/get-user-folder-results.type';
import { UserFolderService } from '../services/user-folder.service';
import { GetUserFolderByUserIdResultsType } from '../models/results/get-user-folder-by-user-id-results.type';

import {
    UserFolderQueryType,
    UserFolderRootResolver,
} from './user-folder-root.resolver';

@Resolver(UserFolderQueryType)
export class UserFolderQueryResolver extends UserFolderRootResolver {
    constructor(private userFolderService: UserFolderService) {
        super();
    }

    @ResolveField(() => GetUserFolderResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getUserFolder(
        @Args('id') id: string,
    ): Promise<GetUserFolderResultsType> {
        return await this.userFolderService.getUserFolder(id);
    }

    @ResolveField(() => GetListUserFolderResultsType, {
        middleware: [AuthMiddleware],
    })
    async getUserFolderList(
        @Args() args: PaginationInputType,
    ): Promise<GetListUserFolderResultsType> {
        return await this.userFolderService.getUserFolderList(args);
    }

    @ResolveField(() => GetUserFolderByUserIdResultsType, {
        middleware: [AuthMiddleware],
    })
    async getUserFolderByUserId(
        @AccessToken() user_id: string,
        @Args('id', { nullable: true }) id?: string,
    ): Promise<GetUserFolderByUserIdResultsType> {
        return await this.userFolderService.getUserFolderByUserId(
            id ?? user_id,
        );
    }

    @ResolveField(() => GetUserFolderByUserIdResultsType, {
        middleware: [AuthMiddleware],
    })
    async getUserFolderByProfileId(
        @ProfileId() profileId: string,
        @Args('id', { nullable: true }) id?: string,
    ): Promise<GetUserFolderByUserIdResultsType> {
        return await this.userFolderService.getUserFolderByProfileId(
            id ?? profileId,
        );
    }
}
