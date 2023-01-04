import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum AnimeType {
    ANIME = 'ANIME',
    MANGA = 'MANGA',
}

registerEnumType(AnimeType, {
    name: 'AnimeType',
});
