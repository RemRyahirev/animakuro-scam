import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { AnimeRelation } from '@prisma/client';
export { AnimeRelation } from '@prisma/client';

registerEnumType(AnimeRelation, {
    name: 'AnimeRelation',
});
