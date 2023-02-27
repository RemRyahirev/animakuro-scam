import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { ReleaseStatus } from '@prisma/client';
export { ReleaseStatus } from '@prisma/client';

registerEnumType(ReleaseStatus, {
    name: 'ReleaseStatus',
});
