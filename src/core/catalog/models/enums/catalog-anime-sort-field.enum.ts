import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogAnimeSortField {
    TITLE = 'title',
    RELEASE_DATE = 'release_date',
    YEAR = 'year',
    COUNTRY_OF_ORIGIN = 'country_of_origin',
    SEASONS_COUNT = 'seasons_count',
    EPISODES = 'episodes',
}

registerEnumType(CatalogAnimeSortField, {
    name: 'CatalogSortField',
});
