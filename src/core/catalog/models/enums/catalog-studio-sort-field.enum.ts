import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogStudioSortField {
    NAME = 'name',
    RATING = 'rating',
    ANIME_COUNT = 'anime_count',
}

registerEnumType(CatalogStudioSortField, {
    name: 'CatalogStudioSortField',
});
