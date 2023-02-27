import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { AiringSchedule } from '../airing-schedule.model';

@ObjectType()
export class CreateAiringScheduleResultsType extends BaseResultsType {
    @Field(() => AiringSchedule, {
        nullable: true,
        description: 'AiringSchedule',
    })
    airing_schedule: AiringSchedule | null;
}
