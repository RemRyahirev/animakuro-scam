import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogCollectionSortField {
    CREATED_AT = 'created_at',
    NAME = 'name',
    DESCRIPTION = 'description',
}

registerEnumType(CatalogCollectionSortField, {
    name: 'CatalogCollectionSortField',
});
