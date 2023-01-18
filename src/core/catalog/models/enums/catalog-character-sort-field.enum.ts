import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogCharacterSortField {
    NAME = 'name',
    GENDER = 'gender',
    DATE_OF_BIRTH = 'date_of_birth',
    AGE = 'age',
}

registerEnumType(CatalogCharacterSortField, {
    name: 'CatalogCharacterSortField',
});


