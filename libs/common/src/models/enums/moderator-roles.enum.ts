import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { ModeratorRoles } from '@prisma/client';
export { ModeratorRoles } from '@prisma/client';

registerEnumType(ModeratorRoles, {
    name: 'ModeratorRoles',
});
