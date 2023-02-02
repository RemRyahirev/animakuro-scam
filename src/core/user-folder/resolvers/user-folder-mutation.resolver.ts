import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserFolderInputType } from '../models/inputs/create-user-folder-input.type';
import {
    UserFolderMutationType,
    UserFolderRootResolver,
} from './user-folder-root.resolver';
import { CreateUserFolderResultsType } from '../models/results/create-user-folder-results.type';
import { UpdateUserFolderResultsType } from '../models/results/update-user-folder-results.type';
import { UpdateUserFolderInputType } from '../models/inputs/update-user-folder-input.type';
import { DeleteUserFolderResultsType } from '../models/results/delete-user-folder-results.type';
import { UserFolderService } from '../services/user-folder.service';

@Resolver(UserFolderMutationType)
export class UserFolderMutationResolver extends UserFolderRootResolver {
    constructor(private userFolderService: UserFolderService) {
        super();
    }

    @ResolveField(() => CreateUserFolderResultsType)
    async createUserFolder(
        @Args() args: CreateUserFolderInputType,
    ): Promise<CreateUserFolderResultsType> {
        return await this.userFolderService.createUserFolder(args);
    }

    @ResolveField(() => UpdateUserFolderResultsType)
    async updateUserFolder(
        @Args() args: UpdateUserFolderInputType,
    ): Promise<UpdateUserFolderResultsType> {
        return await this.userFolderService.updateUserFolder(args);
    }

    @ResolveField(() => DeleteUserFolderResultsType)
    async deleteUserFolder(
        @Args('id') id: string,
    ): Promise<DeleteUserFolderResultsType> {
        return await this.userFolderService.deleteUserFolder(id);
    }
}
