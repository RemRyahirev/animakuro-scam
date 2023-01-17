import { GetCatalogAnimeResultsType } from '../models/results/get-catalog-anime-results.type';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { GetCatalogAuthorResultsType } from "../models/results/get-catalog-author-results.type";

@ObjectType()
export class CatalogQueryType {
    @Field(() => GetCatalogAnimeResultsType, {
        description: 'Search for anime',
    })
    getCatalogAnimeList: GetCatalogAnimeResultsType;

    @Field(() => GetCatalogAuthorResultsType, {
        description: 'Search for authors',
    })
    getCatalogAuthorList: GetCatalogAuthorResultsType;
}

@Resolver()
export class CatalogRootResolver {
    @Query(() => CatalogQueryType, { description: 'Catalog queries' })
    catalogQueries() {
        return {};
    }
}
