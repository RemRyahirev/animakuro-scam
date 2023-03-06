import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationArgsType } from '@app/common/models/inputs';

import { GetOpeningEndingResultsType } from '../models/results/get-opening-ending-results.type';
import { OpeningEndingService } from '../services/opening-ending.service';
import { GetOpeningEndingArgsType } from '../models/inputs/get-opening-ending-args.type';
import { GetOpeningEndingListResultsType } from '../models/results/get-opening-ending-list-results.type';
import { GetOpeningEndingListArgsType } from '../models/inputs/get-opening-ending-list-args.type'
import { GetOpeningEndingListSortArgsType } from '../models/inputs/get-opening-ending-list-sort-args.type';

import { OpeningEndingQueryType, OpeningEndingRootResolver } from './opening-ending-root.resolver';

@Resolver(OpeningEndingQueryType)
export class OpeningEndingQueryResolver extends OpeningEndingRootResolver {
    constructor(private opendingService: OpeningEndingService) {
        super();
    }

    @ResolveField(() => GetOpeningEndingResultsType)
    async getOpeningEnding(
      @Args() args: GetOpeningEndingArgsType,
    ): Promise<GetOpeningEndingResultsType> {
        return await this.opendingService.getOpeningEnding(args);
    }

    @ResolveField(() => GetOpeningEndingListResultsType)
    async getOpeningEndingList(
        @Args() args: GetOpeningEndingListArgsType,
        @Args() sort: GetOpeningEndingListSortArgsType,
        @Args() pages: PaginationArgsType,
    ): Promise<GetOpeningEndingListResultsType> {
        return await this.opendingService.getOpeningEndingList(args, sort, pages);
    }

}
