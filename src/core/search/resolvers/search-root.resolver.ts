import { GetListSearchAnimeResultsType } from '../models/results/get-list-search-anime-results.type';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
export class SearchQueryType {
    @Field(() => GetListSearchAnimeResultsType, {
        description: 'Search for anime',
    })
    getSearchAnimeList: GetListSearchAnimeResultsType;
}

@Resolver()
export class SearchRootResolver {
    @Query(() => SearchQueryType, { description: 'Search queries' })
    searchQueries() {
        return {};
    }
}
