import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { CharacterType } from '@prisma/client';
export { CharacterType } from '@prisma/client';

registerEnumType(CharacterType, {
    name: 'CharacterType',
});
