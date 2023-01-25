import {BaseResultsType, PaginationResultsType} from '../../../../common/models/results';
import { AiringSchedule } from '../airing-schedule.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetListAiringScheduleByAnimeResultsType extends BaseResultsType {
    @Field(() => [AiringSchedule], {
        nullable: true,
        description: 'AiringSchedule',
    })
    airing_schedule: AiringSchedule[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
