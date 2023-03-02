import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { ProfileId } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { CreateUserFolderInputType } from '../models/inputs/create-user-folder-input.type';
import { CreateUserFolderResultsType } from '../models/results/create-user-folder-results.type';
import { UpdateUserFolderResultsType } from '../models/results/update-user-folder-results.type';
import { UpdateUserFolderInputType } from '../models/inputs/update-user-folder-input.type';
import { DeleteUserFolderResultsType } from '../models/results/delete-user-folder-results.type';
import { UserFolderService } from '../services/user-folder.service';

import {
    UserFolderMutationType,
    UserFolderRootResolver,
} from './user-folder-root.resolver';

@Resolver(UserFolderMutationType)
export class UserFolderMutationResolver extends UserFolderRootResolver {
    constructor(private userFolderService: UserFolderService) {
        super();
    }

    @ResolveField(() => CreateUserFolderResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async createUserFolder(
        @ProfileId() profileId: string,
        @Args() args: CreateUserFolderInputType,
    ): Promise<CreateUserFolderResultsType> {
        return await this.userFolderService.createUserFolder(args, profileId);
    }

    @ResolveField(() => UpdateUserFolderResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateUserFolder(
        @Args() args: UpdateUserFolderInputType,
        @ProfileId() profileId: string,
    ): Promise<UpdateUserFolderResultsType> {
        return await this.userFolderService.updateUserFolder(args, profileId);
    }

    @ResolveField(() => DeleteUserFolderResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteUserFolder(
        @Args('id') id: string,
        @ProfileId() profileId: string,
    ): Promise<DeleteUserFolderResultsType> {
        return await this.userFolderService.deleteUserFolder(id, profileId);
    }
}
