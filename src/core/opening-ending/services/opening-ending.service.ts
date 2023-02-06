import { GetOpeningEndingInputType } from "../models/inputs/get-opening-ending-input.type";
import { Injectable } from "@nestjs/common";
import { GetOpeningEndingResultsType } from "../models/results/get-opening-ending-results.type";
import { GetOpeningEndingListInputType } from "../models/inputs/get-opening-ending-list-input.type";
import { PaginationInputType } from "../../../common/models/inputs";
import { GetOpeningEndingListResultsType } from "../models/results/get-opening-ending-list-results.type";
import { CreateOpeningEndingInputType } from "../models/inputs/create-opening-ending-input.type";
import { UpdateOpeningInputType } from "../models/inputs/update-opening-ending-input.type";
import { CreateOpeningEndingResultsType } from "../models/results/create-opening-ending-results.type";
import { UpdateOpeningEndingResultsType } from "../models/results/update-opening-ending-results.type";
import { DeleteOpeningEndingResultsType } from "../models/results/delete-opening-ending-reslts.type";


@Injectable()
export class OpeningEndingService {
    constructor() {}

    async getOpeningEnding(
        input: GetOpeningEndingInputType
    ): Promise<GetOpeningEndingResultsType> {
        return null as any;
    }

    async getOpeningEndingList(
        input: GetOpeningEndingListInputType, 
        pages: PaginationInputType
    ): Promise<GetOpeningEndingListResultsType> {
        return null as any;
    }

    async createOpeningEnding(
        input: CreateOpeningEndingInputType
    ): Promise<CreateOpeningEndingResultsType> {
        return null as any;
    }

    async updateOpeningEnding(
        input: UpdateOpeningInputType
    ): Promise<UpdateOpeningEndingResultsType> {
        return null as any;
    }

    async deleteOpeningEnding(
        id: string
    ): Promise<DeleteOpeningEndingResultsType> {
        return null as any;
    }

}