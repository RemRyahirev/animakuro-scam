import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogIndices {
    ANIME = 'backend-anime',
    AUTHOR = 'backend-author',
    CHARACTER = 'backend-character',
    STUDIO = 'backend-studio',
}

registerEnumType(CatalogIndices, {
    name: 'CatalogIndices',
});
