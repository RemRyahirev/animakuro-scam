import { OpeningEndingQueryType, OpeningEndingRootResolver } from "./opening-ending-root.resolver";
import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { GetOpeningEndingResultsType } from "../models/results/get-opening-ending-results.type";
import { OpeningEndingService } from "../services/opening-ending.service";
import { GetOpeningEndingInputType } from "../models/inputs/get-opening-ending-input.type";
import { PaginationInputType } from "../../../common/models/inputs";
import { GetOpeningEndingListResultsType } from "../models/results/get-opening-ending-list-results.type";
import { GetOpeningEndingListInputType } from "../models/inputs/get-opening-ending-list-input.type"

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
        @Args() pages: PaginationInputType,
    ): Promise<GetOpeningEndingListResultsType> {
        return await this.opendingService.getOpeningEndingList(args, pages);
    }

}
