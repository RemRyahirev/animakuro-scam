import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { AiringSchedule } from '../airing-schedule.model';

@ObjectType()
export class DeleteAiringScheduleResultsType extends BaseResultsType {
    @Field(() => AiringSchedule, {
        nullable: true,
        description: 'AiringSchedule',
    })
    airing_schedule: AiringSchedule | null;
}
