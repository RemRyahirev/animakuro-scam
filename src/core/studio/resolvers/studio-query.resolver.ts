import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import { StudioQueryType, StudioRootResolver } from './studio-root.resolver';
import { GetStudioResultsType } from '../models/results/get-studio-results.type';
import { GetListStudioResultsType } from '../models/results/get-list-studio-results.type';
import { StudioService } from '../services/studio.service';

@Resolver(StudioQueryType)
export class StudioQueryResolver extends StudioRootResolver {
    constructor(private studioService: StudioService) {
        super();
    }

    @ResolveField(() => GetStudioResultsType)
    async getStudio(@Args('id') id: string): Promise<GetStudioResultsType> {
        return await this.studioService.getStudio(id);
    }

    @ResolveField(() => GetListStudioResultsType)
    async getStudioList(
        @Args() args: PaginationInputType,
    ): Promise<GetListStudioResultsType> {
        return await this.studioService.getStudioList(args);
    }
}
