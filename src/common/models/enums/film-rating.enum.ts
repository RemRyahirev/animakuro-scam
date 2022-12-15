import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum FilmRating {
    G = 'G',
    PG = 'PG',
    PG_13 = 'PG_13',
    R = 'R',
    R_17 = 'R_17',
    NC_17 = 'NC_17',
    NC_21 = 'NC_21',
}

registerEnumType(FilmRating, {
    name: 'FilmRating',
});
