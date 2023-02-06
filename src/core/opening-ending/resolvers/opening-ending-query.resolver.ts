import { OpeningEndingQueryType, OpeningEndingRootResolver } from "./opening-ending-root.resolver";
import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { GetOpeningResultsType } from "../models/results/get-opening-results.type";
import { OpeningEndingService } from "../services/opening-ending.service";
import { GetOpeningInputType } from "../models/inputs/get-opening-input.type";
import { PaginationInputType } from "../../../common/models/inputs/";
import { GetOpeningListResultsType } from "../models/results/get-opening-list-results.type";
import { GetOpeningListInputType } from "../models/inputs/get-opening-list-input.type"
import { GetEndingInputType } from "../models/inputs/get-ending-input.type";
import { GetEndingResultsType } from "../models/results/get-ending-results.type";
import { GetEndingListResultsType } from "../models/results/get-ending-list-results.type";
import { GetEndingListInputType } from "../models/inputs/get-ending-list-input.type";

@Resolver(OpeningEndingQueryType)
export class OpeningEndingQueryResolver extends OpeningEndingRootResolver {
    constructor(private opendingService: OpeningEndingService) {
        super();
    }

    @ResolveField(() => GetOpeningResultsType)
    async getOpening(
      @Args() args: GetOpeningInputType,
    ): Promise<GetOpeningResultsType> {
        return await this.opendingService.getOpening(args);
    }

    @ResolveField(() => GetOpeningListResultsType)
    async getOpeningList(
        @Args() args: GetOpeningListInputType,
        @Args() pages: PaginationInputType,
    ): Promise<GetOpeningListResultsType> {
        return await this.opendingService.getOpeningList(args, pages);
    }

    @ResolveField(() => GetEndingResultsType)
    async getEnding(
      @Args() args: GetEndingInputType,
    ): Promise<GetEndingResultsType> {
        return await this.opendingService.getEnding(args);
    }

    @ResolveField(() => GetEndingListResultsType)
    async getEndingList(
        @Args() args: GetEndingListInputType,
        @Args() pages: PaginationInputType,
    ): Promise<GetOpeningListResultsType> {
        return await this.opendingService.getOpeningList(args, pages);
    }
}
