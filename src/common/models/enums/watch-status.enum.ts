import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum WatchStatus {
    WATCHING = 'WATCHING',      // Currently watching
    PLANNED = 'PLANNED',        // Planned to watch
    COMPLETED = 'COMPLETED',    // renamed from SEEN. Finished watching
    DROPPED = 'DROPPED',        // renamed from ABANDONED. Stopped watching before completing
}

registerEnumType(WatchStatus, {
    name: 'WatchStatus',
});
