import { GetCatalogAnimeResultsType } from '../models/results/get-catalog-anime-results.type';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { GetCatalogAuthorResultsType } from '../models/results/get-catalog-author-results.type';
import { GetCatalogStudioResultsType } from '../models/results/get-catalog-studio-results.type';
import { GetCatalogCharacterResultsType } from '../models/results/get-catalog-character-results.type';
import { GetCatalogCollectionResultsType } from '../models/results/get-catalog-collection-results.type';

@ObjectType()
export class CatalogQueryType {
    @Field(() => GetCatalogAnimeResultsType, {
        description: 'Search for anime',
    })
    getCatalogAnimeList: GetCatalogAnimeResultsType;

    @Field(() => GetCatalogAuthorResultsType, {
        description: 'Search for author',
    })
    getCatalogAuthorList: GetCatalogAuthorResultsType;

    @Field(() => GetCatalogCollectionResultsType, {
        description: 'Search for collections',
    })
    getCatalogCollectionList: GetCatalogCollectionResultsType;

    @Field(() => GetCatalogStudioResultsType, {
        description: 'Search for studio',
    })
    getCatalogStudioList: GetCatalogStudioResultsType;

    @Field(() => GetCatalogCharacterResultsType, {
        description: 'Search for character',
    })
    getCatalogCharacterList: GetCatalogCharacterResultsType;
}

@Resolver()
export class CatalogRootResolver {
    @Query(() => CatalogQueryType, { description: 'Catalog queries' })
    catalogQueries() {
        return {};
    }
}
