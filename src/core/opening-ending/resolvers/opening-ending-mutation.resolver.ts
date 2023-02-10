import {
    OpeningEndingMutationType,
    OpeningEndingRootResolver,
} from './opening-ending-root.resolver';
import { Args, ID, ResolveField, Resolver } from '@nestjs/graphql';
import { OpeningEndingService } from '../services/opening-ending.service';
import { CreateOpeningEndingResultsType } from '../models/results/create-opening-ending-results.type';
import { UpdateOpeningEndingResultsType } from '../models/results/update-opening-ending-results.type';
import { UpdateOpeningEndingInputType } from '../models/inputs/update-opening-ending-input.type';
import { DeleteOpeningEndingResultsType } from '../models/results/delete-opening-ending-reslts.type';
import { CreateOpeningEndingInputType } from '../models/inputs/create-opening-ending-input.type';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
import { AccessToken } from '../../../common/decorators';

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
        @Args() args: CreateOpeningEndingInputType,
    ): Promise<CreateOpeningEndingResultsType> {
        return await this.opendingService.createOpeningEnding(args);
    }

    @ResolveField(() => UpdateOpeningEndingResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async updateOpeningEnding(
        @Args() args: UpdateOpeningEndingInputType,
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
