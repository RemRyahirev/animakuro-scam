import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum CatalogCharacterSearchTable {
    CHARACTERS = 'characters',
    ANIMES = 'animes'
}

registerEnumType(CatalogCharacterSearchTable, {
    name: 'CatalogCharacterSearchTable',
});


