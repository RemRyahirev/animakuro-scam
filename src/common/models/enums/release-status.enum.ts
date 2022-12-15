import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum ReleaseStatus {
    FINISHED = 'FINISHED',
    RELEASING = 'RELEASING',
    NOT_YET_RELEASED = 'NOT_YET_RELEASED',
    CANCELLED = 'CANCELLED',
    HIATUS = 'HIATUS',
}

registerEnumType(ReleaseStatus, {
    name: 'ReleaseStatus',
});
