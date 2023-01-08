import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum MediaFormat {
    TV = 'TV',
    TV_SHORT = 'TV_SHORT',
    MOVIE = 'MOVIE',
    SPECIAL = 'SPECIAL',
    OVA = 'OVA',
    ONA = 'ONA',
    MUSIC = 'MUSIC',
    MANGA = 'MANGA',
    NOVEL = 'NOVEL',
    ONE_SHOT = 'ONE_SHOT',
    OTHER = 'OTHER',
}

registerEnumType(MediaFormat, {
    name: 'MediaFormat',
});
