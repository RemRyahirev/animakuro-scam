import { OpeningEndingMutationType, OpeningEndingRootResolver } from "./opening-ending-root.resolver";
import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { OpeningEndingService } from "../services/opening-ending.service";
import { CreateOpeningResultsType } from "../models/results/create-opening-results.type";
import { CreateEndingResultsType } from "../models/results/create-ending-results.type";
import { UpdateOpeningResultsType } from "../models/results/update-opening-results.type";
import { UpdateEndingResultsType } from "../models/results/update-ending-results.type";
import { DeleteOpeningResultsType } from "../models/results/delete-opening-reslts.type";
import { DeleteEndingResultsType } from "../models/results/delete-ending-reslts.type";
import { CreateOpeningInputType } from "../models/inputs/create-opening-input.type";
import { CreateEndingInputType } from "../models/inputs/create-ending-input.type";
import { UpdateOpeningInputType } from "../models/inputs/update-opening-input.type";
import { UpdateEndingInputType } from "../models/inputs/update-ending-input.type";


@Resolver(OpeningEndingMutationType)
export class OpeningEndingMutationResolver extends OpeningEndingRootResolver {
    constructor(private opendingService: OpeningEndingService) {
        super();
    }

    @ResolveField(() => CreateOpeningResultsType)
    async createOpening(
      @Args() args: CreateOpeningInputType,
    ): Promise<CreateOpeningResultsType> {
        return await this.opendingService.createOpening(args);
    }

    @ResolveField(() => CreateEndingResultsType)
    async createEnding(
      @Args() args: CreateEndingInputType,
    ): Promise<CreateEndingResultsType> {
        return await this.opendingService.createEnding(args);
    }

    @ResolveField(() => UpdateOpeningResultsType)
    async updateOpening(
      @Args() args: UpdateOpeningInputType,
    ): Promise<UpdateOpeningResultsType> {
        return await this.opendingService.updateOpening(args);
    }

    @ResolveField(() => UpdateEndingResultsType)
    async updateEnding(
      @Args() args: UpdateEndingInputType,
    ): Promise<UpdateEndingResultsType> {
        return await this.opendingService.updateEnding(args);
    }

    @ResolveField(() => DeleteOpeningResultsType)
    async deleteOpening(
      @Args('id') id: string,
    ): Promise<DeleteOpeningResultsType> {
        return await this.opendingService.deleteOpening(id);
    }

    @ResolveField(() => DeleteEndingResultsType)
    async deleteEnding(
      @Args('id') id: string,
    ): Promise<DeleteEndingResultsType> {
        return await this.opendingService.deleteEnding(id);
    }
}
