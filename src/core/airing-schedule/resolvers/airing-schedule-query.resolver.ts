import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import {
    AiringScheduleQueryType,
    AiringScheduleRootResolver,
} from './airing-schedule-root.resolver';
import { GetListAiringScheduleResultsType } from '../models/results/get-list-airing-schedule-results.type';
import { GetAiringScheduleResultsType } from '../models/results/get-airing-schedule-results.type';
import { AiringScheduleService } from '../services/airing-schedule.service';

@Resolver(AiringScheduleQueryType)
export class AiringScheduleQueryResolver extends AiringScheduleRootResolver {
    constructor(private airingScheduleService: AiringScheduleService) {
        super();
    }

    @ResolveField(() => GetAiringScheduleResultsType)
    async getAiringSchedule(
        @Args('id') id: string,
    ): Promise<GetAiringScheduleResultsType> {
        return await this.airingScheduleService.getAiringSchedule(id);
    }

    @ResolveField(() => GetListAiringScheduleResultsType)
    async getAiringScheduleList(
        @Args() args: PaginationInputType,
    ): Promise<GetListAiringScheduleResultsType> {
        return await this.airingScheduleService.getAiringScheduleList(args);
    }
}
