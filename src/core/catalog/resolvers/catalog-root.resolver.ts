import { GetListCatalogAnimeResultsType } from '../models/results/get-list-catalog-anime-results.type';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
export class CatalogQueryType {
    @Field(() => GetListCatalogAnimeResultsType, {
        description: 'Search for anime',
    })
    getCatalogAnimeList: GetListCatalogAnimeResultsType;
}

@Resolver()
export class CatalogRootResolver {
    @Query(() => CatalogQueryType, { description: 'Catalog queries' })
    catalogQueries() {
        return {};
    }
}
