import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { Gender } from '@prisma/client';
export { Gender } from '@prisma/client';

registerEnumType(Gender, {
    name: 'Gender',
});
