import { Module } from '@nestjs/common';
import { AiringScheduleMutationResolver } from './resolvers/airing-schedule-mutation.resolver';
import { AiringScheduleQueryResolver } from './resolvers/airing-schedule-query.resolver';
import { AiringScheduleRootResolver } from './resolvers/airing-schedule-root.resolver';
import { AiringScheduleService } from './services/airing-schedule.service';

@Module({
    imports: [],
    providers: [
        AiringScheduleService,
        AiringScheduleRootResolver,
        AiringScheduleQueryResolver,
        AiringScheduleMutationResolver,
    ],
    exports: [],
})
export class AiringScheduleModule {}
