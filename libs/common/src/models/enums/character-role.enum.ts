import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { CharacterRole } from '@prisma/client';
export { CharacterRole } from '@prisma/client';

registerEnumType(CharacterRole, {
    name: 'CharacterRole',
});
