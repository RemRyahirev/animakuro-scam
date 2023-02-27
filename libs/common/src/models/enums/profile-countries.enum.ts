import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { ProfileCountries } from '@prisma/client';
export { ProfileCountries } from '@prisma/client';

registerEnumType(ProfileCountries, {
    name: 'ProfileCountries',
});
