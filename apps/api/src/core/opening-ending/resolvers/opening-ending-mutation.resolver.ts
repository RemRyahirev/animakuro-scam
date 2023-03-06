import { UseGuards } from '@nestjs/common';
import { Args, ID, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { OpeningEndingService } from '../services/opening-ending.service';
import { CreateOpeningEndingResultsType } from '../models/results/create-opening-ending-results.type';
import { UpdateOpeningEndingResultsType } from '../models/results/update-opening-ending-results.type';
import { UpdateOpeningEndingArgsType } from '../models/inputs/update-opening-ending-args.type';
import { DeleteOpeningEndingResultsType } from '../models/results/delete-opening-ending-reslts.type';
import { CreateOpeningEndingArgsType } from '../models/inputs/create-opening-ending-args.type';

import {
    OpeningEndingMutationType,
    OpeningEndingRootResolver,
} from './opening-ending-root.resolver';

@Resolver(OpeningEndingMutationType)
export class OpeningEndingMutationResolver extends OpeningEndingRootResolver {
    constructor(private opendingService: OpeningEndingService) {
        super();
    }

    @ResolveField(() => CreateOpeningEndingResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async createOpeningEnding(
        @Args() args: CreateOpeningEndingArgsType,
    ): Promise<CreateOpeningEndingResultsType> {
        return await this.opendingService.createOpeningEnding(args);
    }

    @ResolveField(() => UpdateOpeningEndingResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateOpeningEnding(
        @Args() args: UpdateOpeningEndingArgsType,
    ): Promise<UpdateOpeningEndingResultsType> {
        return await this.opendingService.updateOpeningEnding(args);
    }

    @ResolveField(() => DeleteOpeningEndingResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async deleteOpeningEnding(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<DeleteOpeningEndingResultsType> {
        return await this.opendingService.deleteOpeningEnding(id);
    }
}
