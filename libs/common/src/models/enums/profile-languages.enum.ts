import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { ProfileLanguages } from '@prisma/client';
export { ProfileLanguages } from '@prisma/client';

registerEnumType(ProfileLanguages, {
    name: 'ProfileLanguages',
});
