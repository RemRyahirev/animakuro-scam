import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { DeleteStudioResultsType } from '../models/results/delete-studio-results.type';
import { UpdateStudioArgsType } from '../models/inputs/update-studio-args.type';
import { UpdateStudioResultsType } from '../models/results/update-studio-results.type';
import { CreateStudioResultsType } from '../models/results/create-studio-results.type';
import { CreateStudioArgsType } from '../models/inputs/create-studio-args.type';
import { StudioService } from '../services/studio.service';

import { StudioMutationType, StudioRootResolver } from './studio-root.resolver';

@UseGuards(JwtAuthGuard)
@Resolver(StudioMutationType)
export class StudioMutationResolver extends StudioRootResolver {
    constructor(private studioService: StudioService) {
        super();
    }

    @ResolveField(() => CreateStudioResultsType, {
        middleware: [AuthMiddleware],
    })
    async createStudio(
        @Args() args: CreateStudioArgsType,
        @AccessToken() user_id: string,
    ): Promise<CreateStudioResultsType> {
        return await this.studioService.createStudio(args, user_id);
    }

    @ResolveField(() => UpdateStudioResultsType, {
        middleware: [AuthMiddleware],
    })
    async updateStudio(
        @Args() args: UpdateStudioArgsType,
        @AccessToken() user_id: string,
    ): Promise<UpdateStudioResultsType> {
        return await this.studioService.updateStudio(args, user_id);
    }

    @ResolveField(() => DeleteStudioResultsType)
    async deleteStudio(
        @Args('id') id: string,
    ): Promise<DeleteStudioResultsType> {
        return await this.studioService.deleteStudio(id);
    }
}
