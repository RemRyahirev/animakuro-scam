import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { ICustomContext } from '../../../common/models/interfaces';
import { DeleteStudioResultsType } from '../models/results/delete-studio-results.type';
import { StudioMutationType, StudioRootResolver } from './studio-root.resolver';
import { UpdateStudioInputType } from '../models/inputs/update-studio-input.type';
import { UpdateStudioResultsType } from '../models/results/update-studio-results.type';
import { CreateStudioResultsType } from '../models/results/create-studio-results.type';
import { CreateStudioInputType } from '../models/inputs/create-studio-input.type';
import { StudioService } from '../services/studio.service';

@Resolver(StudioMutationType)
export class StudioMutationResolver extends StudioRootResolver {
    constructor(private studioService: StudioService) {
        super();
    }

    @ResolveField(() => CreateStudioResultsType)
    async createStudio(
        @Args() args: CreateStudioInputType,
        @Context() ctx: ICustomContext,
    ): Promise<CreateStudioResultsType> {
        return await this.studioService.createStudio(args, ctx);
    }

    @ResolveField(() => UpdateStudioResultsType)
    async updateStudio(
        @Args() args: UpdateStudioInputType,
        @Context() ctx: ICustomContext,
    ): Promise<UpdateStudioResultsType> {
        return await this.studioService.updateStudio(args, ctx);
    }

    @ResolveField(() => DeleteStudioResultsType)
    async deleteStudio(
        @Args('id') id: string,
        @Context() ctx: ICustomContext,
    ): Promise<DeleteStudioResultsType> {
        return await this.studioService.deleteStudio(id, ctx);
    }
}
