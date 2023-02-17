import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';
import { AnimeApproval } from '@prisma/client';
export { AnimeApproval } from '@prisma/client';

registerEnumType(AnimeApproval, {
    name: 'AnimeApproval',
});
