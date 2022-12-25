import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import { StudioQueryType, StudioRootResolver } from './studio-root.resolver';
import { GetStudioResultsType } from '../models/results/get-studio-results.type';
import { GetListStudioResultsType } from '../models/results/get-list-studio-results.type';

@Resolver(StudioQueryType)
export class StudioQueryResolver extends StudioRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetStudioResultsType)
    async getStudio(@Arg('id') id: string): Promise<GetStudioResultsType> {
        return await this.studioService.getStudio(id);
    }

    @FieldResolver(() => GetListStudioResultsType)
    async getStudioList(
        @Args() args: PaginationInputType,
    ): Promise<GetListStudioResultsType> {
        return await this.studioService.getStudioList(args);
    }
}
