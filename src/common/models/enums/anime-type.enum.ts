import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum AnimeType {
    ANIME = 'ANIME',
    MANGA = 'MANGA',
}

registerEnumType(AnimeType, {
    name: 'AnimeType',
});
