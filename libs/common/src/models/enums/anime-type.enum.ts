import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { AnimeType } from '@prisma/client';
export { AnimeType } from '@prisma/client';

registerEnumType(AnimeType, {
    name: 'AnimeType',
});
