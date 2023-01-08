import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum ReleaseStatus {
    COMPLETED = 'COMPLETED',
    ANNOUNCEMENT = 'ANNOUNCEMENT',
    RELEASING = 'RELEASING',
    AIRING = 'AIRING',
    NOT_YET_RELEASED = 'NOT_YET_RELEASED',
    CANCELLED = 'CANCELLED',
    HIATUS = 'HIATUS',
}

registerEnumType(ReleaseStatus, {
    name: 'ReleaseStatus',
});
