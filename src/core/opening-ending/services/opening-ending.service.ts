import { GetOpeningEndingInputType } from "../models/inputs/get-opening-ending-input.type";
import { Injectable } from "@nestjs/common";
import { GetOpeningEndingResultsType } from "../models/results/get-opening-ending-results.type";
import { GetOpeningEndingListInputType } from "../models/inputs/get-opening-ending-list-input.type";
import { PaginationInputType } from "../../../common/models/inputs";
import { GetOpeningEndingListResultsType } from "../models/results/get-opening-ending-list-results.type";
import { CreateOpeningEndingInputType } from "../models/inputs/create-opening-ending-input.type";
import { UpdateOpeningEndingInputType } from "../models/inputs/update-opening-ending-input.type";
import { CreateOpeningEndingResultsType } from "../models/results/create-opening-ending-results.type";
import { UpdateOpeningEndingResultsType } from "../models/results/update-opening-ending-results.type";
import { DeleteOpeningEndingResultsType } from "../models/results/delete-opening-ending-reslts.type";
import { PrismaService } from "../../../common/services/prisma.service";
import { PaginationService } from "../../../common/services/pagination.service";
import { OpeningEnding } from "../models/opening-ending.model";
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { GetOpeningEndingListSortInputType } from "../models/inputs/get-opening-ending-list-sort-input.type";
import { OpeningEndingTransformerService } from "./opening-ending-transformer.service";


@Injectable()
export class OpeningEndingService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly paginationService: PaginationService,
        private readonly opeTransformer: OpeningEndingTransformerService
    ) {}

    async getOpeningEnding(
        input: GetOpeningEndingInputType
    ): Promise<GetOpeningEndingResultsType> {

        const openingEnding = await this.prisma.openingEnding.findUnique({
            where: input,
            include: {
                anime: true
            },
        })
        
        if (!openingEnding) {
            return { 
                success: false, 
                opening_ending: openingEnding, 
                errors: [{property: 'id', reason: 'not found', value: input.id}]
            }
        }

        return {success: true, opening_ending: openingEnding };
    }

    async getOpeningEndingList(
        input: GetOpeningEndingListInputType,
        sort: GetOpeningEndingListSortInputType, 
        pages: PaginationInputType
    ): Promise<GetOpeningEndingListResultsType> {
        const trWhere = this.opeTransformer.transformInput(input, ['min', 'max']);
        const openingEndingList = await this.prisma.openingEnding.findMany({
            where: trWhere,
            orderBy: {
                // @ts-ignore
                [sort.sort_field]: sort.sort_order
            },
            include: {
                anime: true
            },
            ...transformPaginationUtil(pages)
        });

        const pagination = await this.paginationService.getPagination(
            'openingEnding',
            pages,
            {
                where: trWhere
            }
        );

        if (!openingEndingList.length) {
            return {
                success: false,
                errors: [{ property: '', reason: 'no results', value: '' }],
                opening_ending_list: openingEndingList as any,
                pagination,
            };
        }

        return {
            success: true,
            errors: [],
            opening_ending_list: openingEndingList as any,
            pagination,
        };
    }

    async createOpeningEnding(
        input: CreateOpeningEndingInputType
    ): Promise<CreateOpeningEndingResultsType> {

        const openingEnding = await this.prisma.openingEnding.create({
            data: input,
            include: {
                anime: true
            }
        })
        if (!openingEnding) {
            return {
                success: false,
                opening_ending: openingEnding,
                errors: [{property: '', reason: 'invalid incoming data', value: ''}]
            }
        }

        return {success: true, opening_ending: openingEnding as any};
    }

    async updateOpeningEnding(
        input: UpdateOpeningEndingInputType
    ): Promise<UpdateOpeningEndingResultsType> {

        const updOpeningEnding = await this.prisma.openingEnding.update({
            where: {id: input.id},
            data: input,
            include: {
                anime: true
            }
        })
        
        if (!updOpeningEnding) {
            return {
                success: false,
                opening_ending: updOpeningEnding,
                errors: [{property: '', reason: 'incorrect data', value: JSON.stringify(input)}]
            }
        }

        return {success: true, opening_ending: updOpeningEnding as any};
    }

    async deleteOpeningEnding(
        id: string
    ): Promise<DeleteOpeningEndingResultsType> {

        const deletedOpeningEnding = await this.prisma.openingEnding.delete({
            where: { id },
        })

        if (!deletedOpeningEnding) {
            return {
                success: false,
                opening_ending: deletedOpeningEnding,
                errors: [{property: 'id', reason: 'not found', value: id}]
            };
        }

        return {success: true, opening_ending: deletedOpeningEnding as any};
    }

}