import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogAuthorSearchTable {
    AUTHORS = 'authors',
    ANIMES = 'animes'
}

registerEnumType(CatalogAuthorSearchTable, {
    name: 'CatalogAuthorSearchTableEnum',
});



