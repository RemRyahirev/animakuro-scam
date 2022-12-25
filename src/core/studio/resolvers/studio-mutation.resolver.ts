import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { ICustomContext } from '../../../common/models/interfaces';
import { DeleteStudioResultsType } from '../models/results/delete-studio-results.type';
import { StudioMutationType, StudioRootResolver } from './studio-root.resolver';
import { UpdateStudioInputType } from '../models/inputs/update-studio-input.type';
import { UpdateStudioResultsType } from '../models/results/update-studio-results.type';
import { CreateStudioResultsType } from '../models/results/create-studio-results.type';
import { CreateStudioInputType } from '../models/inputs/create-studio-input.type';

@Resolver(StudioMutationType)
export class StudioMutationResolver extends StudioRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => CreateStudioResultsType)
    async createStudio(
        @Args() args: CreateStudioInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<CreateStudioResultsType> {
        return await this.studioService.createStudio(args, ctx);
    }

    @FieldResolver(() => UpdateStudioResultsType)
    async updateStudio(
        @Args() args: UpdateStudioInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<UpdateStudioResultsType> {
        return await this.studioService.updateStudio(args, ctx);
    }

    @FieldResolver(() => DeleteStudioResultsType)
    async deleteStudio(
        @Arg('id') id: string,
        @Ctx() ctx: ICustomContext,
    ): Promise<DeleteStudioResultsType> {
        return await this.studioService.deleteStudio(id, ctx);
    }
}
