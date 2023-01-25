import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import {
    AiringScheduleQueryType,
    AiringScheduleRootResolver,
} from './airing-schedule-root.resolver';
import { GetListAiringScheduleResultsType } from '../models/results/get-list-airing-schedule-results.type';
import { GetAiringScheduleResultsType } from '../models/results/get-airing-schedule-results.type';
import { AiringScheduleService } from '../services/airing-schedule.service';
import { GetListAiringScheduleByAnimeResultsType } from '../models/results/get-list-airing-schedule-by-anime-results.type';
import { GetNextAiringScheduleByAnimeResultsType } from '../models/results/get-next-airing-schedule-by-anime-results.type';
import { GetListAiringScheduleInput } from '../models/inputs/get-list-airing-schedule-input';

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
        @Args() args: GetListAiringScheduleInput,
        @Args() pages: PaginationInputType,
    ): Promise<GetListAiringScheduleResultsType> {
        return await this.airingScheduleService.getAiringScheduleList(args, pages);
    }

    @ResolveField(() => GetNextAiringScheduleByAnimeResultsType)
    async getNextAiringScheduleByAnime(@Args('anime_id') anime_id: string) {
        return await this.airingScheduleService.getNextAiringScheduleByAnime(
            anime_id,
        );
    }

    @ResolveField(() => GetListAiringScheduleByAnimeResultsType)
    async getListAiringScheduleByAnime(
        @Args('anime_id') anime_id: string,
        @Args() args: PaginationInputType,
    ) {
        return await this.airingScheduleService.getListAiringScheduleByAnime(
            anime_id,
            args,
        );
    }
}
