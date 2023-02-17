import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { MediaFormat } from '@prisma/client';
export { MediaFormat } from '@prisma/client';

registerEnumType(MediaFormat, {
    name: 'MediaFormat',
});
