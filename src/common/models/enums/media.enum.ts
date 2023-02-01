import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum Media {
    CHARACTERS = 'CHARACTERS',
    AUTHORS = 'AUTHORS',
    ANIMES = 'ANIMES',
    GENRES = 'GENRES',
    STUDIOS = 'STUDIOS',
}

registerEnumType(Media, {
    name: 'Media',
});
