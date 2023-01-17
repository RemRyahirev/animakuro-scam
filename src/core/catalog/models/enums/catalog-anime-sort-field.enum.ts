import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogAnimeSortField {
    TITLE = 'title',
    RELEASE_DATE = 'release_date',
}

registerEnumType(CatalogAnimeSortField, {
    name: 'CatalogSortField',
});
