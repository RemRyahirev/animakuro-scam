import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards';
import { AuthMiddleware } from 'common/middlewares/auth.middleware';
import { AccessToken } from 'common/decorators';
import { DeleteStudioResultsType } from '../models/results/delete-studio-results.type';
import { StudioMutationType, StudioRootResolver } from './studio-root.resolver';
import { UpdateStudioInputType } from '../models/inputs/update-studio-input.type';
import { UpdateStudioResultsType } from '../models/results/update-studio-results.type';
import { CreateStudioResultsType } from '../models/results/create-studio-results.type';
import { CreateStudioInputType } from '../models/inputs/create-studio-input.type';
import { StudioService } from '../services/studio.service';

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
        @Args() args: CreateStudioInputType,
        @AccessToken() user_id: string,
    ): Promise<CreateStudioResultsType> {
        return await this.studioService.createStudio(args, user_id);
    }

    @ResolveField(() => UpdateStudioResultsType, {
        middleware: [AuthMiddleware],
    })
    async updateStudio(
        @Args() args: UpdateStudioInputType,
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
