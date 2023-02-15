import { OpeningEndingQueryType, OpeningEndingRootResolver } from "./opening-ending-root.resolver";
import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { GetOpeningEndingResultsType } from "../models/results/get-opening-ending-results.type";
import { OpeningEndingService } from "../services/opening-ending.service";
import { GetOpeningEndingInputType } from "../models/inputs/get-opening-ending-input.type";
import { PaginationInputType } from "../../../common/models/inputs";
import { GetOpeningEndingListResultsType } from "../models/results/get-opening-ending-list-results.type";
import { GetOpeningEndingListInputType } from "../models/inputs/get-opening-ending-list-input.type"
import { GetOpeningEndingListSortInputType } from "../models/inputs/get-opening-ending-list-sort-input.type";
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
import { AccessToken } from '../../../common/decorators';
@Resolver(OpeningEndingQueryType)
export class OpeningEndingQueryResolver extends OpeningEndingRootResolver {
    constructor(private opendingService: OpeningEndingService) {
        super();
    }

    @ResolveField(() => GetOpeningEndingResultsType)
    async getOpeningEnding(
      @Args() args: GetOpeningEndingInputType,
    ): Promise<GetOpeningEndingResultsType> {
        return await this.opendingService.getOpeningEnding(args);
    }

    @ResolveField(() => GetOpeningEndingListResultsType)
    async getOpeningEndingList(
        @Args() args: GetOpeningEndingListInputType,
        @Args() sort: GetOpeningEndingListSortInputType,
        @Args() pages: PaginationInputType,
    ): Promise<GetOpeningEndingListResultsType> {
        return await this.opendingService.getOpeningEndingList(args, sort, pages);
    }

}
