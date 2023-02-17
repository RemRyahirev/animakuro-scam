import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { FilmRating } from '@prisma/client';
export { FilmRating } from '@prisma/client';

registerEnumType(FilmRating, {
    name: 'FilmRating',
});
