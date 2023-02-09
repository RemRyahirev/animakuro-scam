import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import {AnimeType} from '@prisma/client'
export {AnimeType} from '@prisma/client'

// export enum AnimeType {
//     ANIME = 'ANIME',
//     MANGA = 'MANGA',
// }

// export AnimeType

registerEnumType(AnimeType, {
    name: 'AnimeType',
});
