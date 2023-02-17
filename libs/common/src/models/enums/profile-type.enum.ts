import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { ProfileType } from '@prisma/client';
export { ProfileType } from '@prisma/client';

registerEnumType(ProfileType, {
    name: 'ProfileType',
});
