import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { AnimeStillsType } from '@prisma/client';
export { AnimeStillsType } from '@prisma/client';

registerEnumType(AnimeStillsType, {
    name: 'AnimeStillsType',
});
