import { Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { CreateAiringScheduleResultsType } from '../models/results/create-airing-schedule-results.type';
import { UpdateAiringScheduleResultsType } from '../models/results/update-airing-schedule-results.type';
import { DeleteAiringScheduleResultsType } from '../models/results/delete-airing-schedule-results.type';
import { GetListAiringScheduleResultsType } from '../models/results/get-list-airing-schedule-results.type';
import { GetAiringScheduleResultsType } from '../models/results/get-airing-schedule-results.type';

@ObjectType()
export class AiringScheduleMutationType {
    /**
     * Create Airing Schedule
     */
    createAiringSchedule: CreateAiringScheduleResultsType;

    /**
     * Update Airing Schedule
     */
    updateAiringSchedule: UpdateAiringScheduleResultsType;

    /**
     * Delete Airing Schedule
     */
    deleteAiringSchedule: DeleteAiringScheduleResultsType;
}

@ObjectType()
export class AiringScheduleQueryType {
    /**
     * Get Airing Schedule by ID
     */
    getAiringSchedule: GetAiringScheduleResultsType;

    /**
     * Get Airing Schedule  list
     */
    getAiringScheduleList: GetListAiringScheduleResultsType;
}

@Resolver()
export class AiringScheduleRootResolver {
    @Mutation(() => AiringScheduleMutationType, {
        description: 'Airing Schedule mutations',
    })
    airingScheduleMutations() {
        return {};
    }

    @Query(() => AiringScheduleQueryType, {
        description: 'Airing Schedule queries',
    })
    airingScheduleQueries() {
        return {};
    }
}
