import { ObjectType } from '@nestjs/graphql';

import { BaseResultsType, PaginationResultsType } from '@app/common/models/results';

import { AiringSchedule } from '../airing-schedule.model';

@ObjectType()
export class GetListAiringScheduleResultsType extends BaseResultsType {
    /**
     * AiringSchedule
     */
    airing_schedule: AiringSchedule[];

    /**
     * Pagination data
     */
    pagination: PaginationResultsType;
}
