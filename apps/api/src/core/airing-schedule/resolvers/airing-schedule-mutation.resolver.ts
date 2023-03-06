import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { JwtAuthGuard } from '@app/common/guards';

import { DeleteAiringScheduleResultsType } from '../models/results/delete-airing-schedule-results.type';
import { CreateAiringScheduleResultsType } from '../models/results/create-airing-schedule-results.type';
import { UpdateAiringScheduleResultsType } from '../models/results/update-airing-schedule-results.type';
import { AiringScheduleService } from '../services/airing-schedule.service';
import { CreateAiringScheduleArgsType } from '../models/inputs/create-airing-schedule-args.type';
import { UpdateAiringScheduleArgsType } from '../models/inputs/update-airing-schedule-args.type';

import {
    AiringScheduleMutationType,
    AiringScheduleRootResolver,
} from './airing-schedule-root.resolver';

@Resolver(AiringScheduleMutationType)
export class AiringScheduleMutationResolver extends AiringScheduleRootResolver {
    constructor(private airingScheduleService: AiringScheduleService) {
        super();
    }

    @ResolveField(() => CreateAiringScheduleResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async createAiringSchedule(
        @Args() args: CreateAiringScheduleArgsType,
    ): Promise<CreateAiringScheduleResultsType> {
        return await this.airingScheduleService.createAiringSchedule(args);
    }

    @ResolveField(() => UpdateAiringScheduleResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateAiringSchedule(
        @Args() args: UpdateAiringScheduleArgsType,
    ): Promise<UpdateAiringScheduleResultsType> {
        return await this.airingScheduleService.updateAiringSchedule(args);
    }

    @ResolveField(() => DeleteAiringScheduleResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteAiringSchedule(
        @Args('id') id: string,
    ): Promise<DeleteAiringScheduleResultsType> {
        return await this.airingScheduleService.deleteAiringSchedule(id);
    }
}
