import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { AuthType } from '@prisma/client';
export { AuthType } from '@prisma/client';

registerEnumType(AuthType, {
    name: 'AuthType',
});
