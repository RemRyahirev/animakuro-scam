import { registerEnumType } from 'type-graphql';

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
