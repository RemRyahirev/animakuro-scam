import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogAuthorSortField {
    NAME = 'name',
}

registerEnumType(CatalogAuthorSortField, {
    name: 'CatalogAuthorSortField',
});

