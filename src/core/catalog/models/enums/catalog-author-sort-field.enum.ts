import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogAuthorSortField {
    NAME = 'name',
    AGE = 'age',
    HOME_TOWN = 'home_town',
    LANGUAGE = 'language',
    GENDER = 'gender',
}

registerEnumType(CatalogAuthorSortField, {
    name: 'CatalogAuthorSortField',
});

