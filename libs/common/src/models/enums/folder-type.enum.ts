import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { FolderType } from '@prisma/client';
export { FolderType } from '@prisma/client';

registerEnumType(FolderType, {
    name: 'FolderType',
});
