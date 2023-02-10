import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    AiringScheduleMutationType,
    AiringScheduleRootResolver,
} from './airing-schedule-root.resolver';
import { DeleteAiringScheduleResultsType } from '../models/results/delete-airing-schedule-results.type';
import { CreateAiringScheduleResultsType } from '../models/results/create-airing-schedule-results.type';
import { UpdateAiringScheduleResultsType } from '../models/results/update-airing-schedule-results.type';
import { AiringScheduleService } from '../services/airing-schedule.service';
import { CreateAiringScheduleInputType } from '../models/inputs/create-airing-schedule-input.type';
import { UpdateAiringScheduleInputType } from '../models/inputs/update-airing-schedule-input.type';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards';
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
        @Args() args: CreateAiringScheduleInputType,
    ): Promise<CreateAiringScheduleResultsType> {
        return await this.airingScheduleService.createAiringSchedule(args);
    }

    @ResolveField(() => UpdateAiringScheduleResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateAiringSchedule(
        @Args() args: UpdateAiringScheduleInputType,
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
