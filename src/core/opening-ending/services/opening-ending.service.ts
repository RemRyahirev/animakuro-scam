import { GetOpeningInputType } from "../models/inputs/get-opening-input.type";
import { Injectable } from "@nestjs/common";
import { GetOpeningResultsType } from "../models/results/get-opening-results.type";
import { GetEndingInputType } from "../models/inputs/get-ending-input.type";
import { GetEndingResultsType } from "../models/results/get-ending-results.type";
import { GetOpeningListInputType } from "../models/inputs/get-opening-list-input.type";
import { PaginationInputType } from "../../../common/models/inputs";
import { GetEndingListInputType } from "../models/inputs/get-ending-list-input.type";
import { GetOpeningListResultsType } from "../models/results/get-opening-list-results.type";
import { GetEndingListResultsType } from "../models/results/get-ending-list-results.type";
import { CreateOpeningInputType } from "../models/inputs/create-opening-input.type";
import { CreateEndingInputType } from "../models/inputs/create-ending-input.type";
import { UpdateOpeningInputType } from "../models/inputs/update-opening-input.type";
import { UpdateEndingInputType } from "../models/inputs/update-ending-input.type";
import { CreateOpeningResultsType } from "../models/results/create-opening-results.type";
import { CreateEndingResultsType } from "../models/results/create-ending-results.type";
import { UpdateOpeningResultsType } from "../models/results/update-opening-results.type";
import { UpdateEndingResultsType } from "../models/results/update-ending-results.type";
import { DeleteOpeningResultsType } from "../models/results/delete-opening-reslts.type";
import { DeleteEndingResultsType } from "../models/results/delete-ending-reslts.type";


@Injectable()
export class OpeningEndingService {
    constructor() {}

    async getOpening(input: GetOpeningInputType): Promise<GetOpeningResultsType> {
        return null as any;
    }

    async getEnding(input: GetEndingInputType): Promise<GetEndingResultsType> {
        return null as any;
    }

    async getOpeningList(
        input: GetOpeningListInputType, 
        pages: PaginationInputType
    ): Promise<GetOpeningListResultsType> {
        return null as any;
    }

    async getEndingList(
        input: GetEndingListInputType, 
        pages: PaginationInputType
    ): Promise<GetEndingListResultsType> {
        return null as any;
    }

    async createOpening(input: CreateOpeningInputType): Promise<CreateOpeningResultsType> {
        return null as any;
    }

    async createEnding(input: CreateEndingInputType): Promise<CreateEndingResultsType> {
        return null as any;
    }

    async updateOpening(input: UpdateOpeningInputType): Promise<UpdateOpeningResultsType> {
        return null as any;
    }

    async updateEnding(input: UpdateEndingInputType): Promise<UpdateEndingResultsType> {
        return null as any;
    }

    async deleteOpening(id: string): Promise<DeleteOpeningResultsType> {
        return null as any;
    }

    async deleteEnding(id: string): Promise<DeleteEndingResultsType> {
        return null as any;
    }
}