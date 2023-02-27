import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { YearSeason } from '@prisma/client';
export { YearSeason } from '@prisma/client';

registerEnumType(YearSeason, {
    name: 'YearSeason',
});
