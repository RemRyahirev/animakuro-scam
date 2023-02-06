import { OpeningEndingMutationType, OpeningEndingRootResolver } from "./opening-ending-root.resolver";
import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { OpeningEndingService } from "../services/opening-ending.service";
import { CreateOpeningEndingResultsType } from "../models/results/create-opening-ending-results.type";
import { UpdateOpeningEndingResultsType} from "../models/results/update-opening-ending-results.type";
import { UpdateOpeningInputType } from "../models/inputs/update-opening-ending-input.type";
import { DeleteOpeningEndingResultsType } from "../models/results/delete-opening-ending-reslts.type";
import { CreateOpeningEndingInputType } from "../models/inputs/create-opening-ending-input.type";


@Resolver(OpeningEndingMutationType)
export class OpeningEndingMutationResolver extends OpeningEndingRootResolver {
    constructor(private opendingService: OpeningEndingService) {
        super();
    }

    @ResolveField(() => CreateOpeningEndingResultsType)
    async createOpeningEnding(
      @Args() args: CreateOpeningEndingInputType,
    ): Promise<CreateOpeningEndingResultsType> {
        return await this.opendingService.createOpeningEnding(args);
    }

    @ResolveField(() => UpdateOpeningEndingResultsType)
    async updateOpening(
      @Args() args: UpdateOpeningInputType,
    ): Promise<UpdateOpeningEndingResultsType> {
        return await this.opendingService.updateOpeningEnding(args);
    }

    @ResolveField(() => DeleteOpeningEndingResultsType)
    async deleteOpening(
      @Args('id') id: string,
    ): Promise<DeleteOpeningEndingResultsType> {
        return await this.opendingService.deleteOpeningEnding(id);
    }

}
