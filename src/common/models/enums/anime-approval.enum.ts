import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum AnimeApproval {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
}

registerEnumType(AnimeApproval, {
    name: 'AnimeApproval',
});
