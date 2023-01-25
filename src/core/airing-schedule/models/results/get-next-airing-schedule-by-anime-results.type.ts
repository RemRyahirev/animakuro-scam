import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Field, ObjectType } from '@nestjs/graphql';
import { AiringSchedule } from '../airing-schedule.model';

@ObjectType()
export class GetNextAiringScheduleByAnimeResultsType extends BaseResultsType {
    @Field(() => AiringSchedule, {
        nullable: true,
        description: 'AiringSchedule',
    })
    airing_schedule: AiringSchedule | null;
}
