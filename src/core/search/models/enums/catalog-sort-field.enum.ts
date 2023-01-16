import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogSortField {
    TITLE = 'title',
    RELEASE_DATE = 'release_date',
}

registerEnumType(CatalogSortField, {
    name: 'CatalogSortField',
});
