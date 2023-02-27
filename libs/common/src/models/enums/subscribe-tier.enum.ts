import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { SubscribeTier } from '@prisma/client';
export { SubscribeTier } from '@prisma/client';

registerEnumType(SubscribeTier, {
    name: 'SubscribeTier',
});
