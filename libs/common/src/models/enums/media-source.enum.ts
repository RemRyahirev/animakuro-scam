import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { MediaSource } from '@prisma/client';
export { MediaSource } from '@prisma/client';

registerEnumType(MediaSource, {
    name: 'MediaSource',
});
