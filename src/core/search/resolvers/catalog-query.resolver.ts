import { SearchQueryType, SearchRootResolver } from './search-root.resolver';
import { GetListSearchAnimeResultsType } from '../models/results/get-list-search-anime-results.type';
import { SearchAnimeInputType } from '../models/inputs/search-anime-input.type';
import { SearchService } from '../services/search.service';
import { Resolver, ResolveField, Args } from '@nestjs/graphql';

@Resolver(SearchQueryType)
export class SearchQueryResolver extends SearchRootResolver {
    constructor(private searchService: SearchService) {
        super();
    }

    @ResolveField(() => GetListSearchAnimeResultsType)
    async getSearchAnimeList(
        @Args() args: SearchAnimeInputType,
    ): Promise<GetListSearchAnimeResultsType> {
        return await this.searchService.getSearchAnimeList(args);
    }
}
