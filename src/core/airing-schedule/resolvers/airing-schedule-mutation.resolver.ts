import { Args, ID, Int, ResolveField, Resolver } from '@nestjs/graphql';
import {
    AiringScheduleMutationType,
    AiringScheduleRootResolver,
} from './airing-schedule-root.resolver';
import { DeleteAiringScheduleResultsType } from '../models/results/delete-airing-schedule-results.type';
import { CreateAiringScheduleResultsType } from '../models/results/create-airing-schedule-results.type';
import { UpdateAiringScheduleResultsType } from '../models/results/update-airing-schedule-results.type';
import { AiringScheduleService } from '../services/airing-schedule.service';

@Resolver(AiringScheduleMutationType)
export class AiringScheduleMutationResolver extends AiringScheduleRootResolver {
    constructor(private airingScheduleService: AiringScheduleService) {
        super();
    }

    @ResolveField(() => CreateAiringScheduleResultsType)
    async createAiringSchedule(
        @Args({ name: 'scheduled_animes_add', type: () => [String] })
        scheduled_animes_add: string[],
        @Args({ name: 'episodes', type: () => [Int] }) episodes: number[],
    ): Promise<CreateAiringScheduleResultsType> {
        return await this.airingScheduleService.createAiringSchedule(
            scheduled_animes_add,
            episodes,
        );
    }

    @ResolveField(() => UpdateAiringScheduleResultsType)
    async updateAiringSchedule(
        @Args({ name: 'id', type: () => ID })
        id: string,
        @Args({ name: 'anime_id', type: () => ID })
        anime_id: string,
        @Args({ name: 'episode', type: () => ID })
        episode: number,
        @Args({ name: 'airing_at', type: () => ID })
        airing_at: Date,
        @Args({ name: 'time_until_airing', type: () => ID })
        time_until_airing: number,
    ): Promise<UpdateAiringScheduleResultsType> {
        return await this.airingScheduleService.updateAiringSchedule(
            id,
            anime_id,
            episode,
            airing_at,
            time_until_airing,
        );
    }

    @ResolveField(() => DeleteAiringScheduleResultsType)
    async deleteAiringSchedule(
        @Args({ name: 'scheduled_animes_remove', type: () => [String] })
        scheduled_animes_remove: string[],
    ): Promise<DeleteAiringScheduleResultsType> {
        return await this.airingScheduleService.deleteAiringSchedule(
            scheduled_animes_remove,
        );
    }
}