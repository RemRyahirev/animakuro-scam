import { Injectable } from '@nestjs/common';

import { PaginationArgsType } from '@app/common/models/inputs';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { GetOpeningEndingArgsType } from '../models/inputs/get-opening-ending-args.type';
import { GetOpeningEndingResultsType } from '../models/results/get-opening-ending-results.type';
import { GetOpeningEndingListArgsType } from '../models/inputs/get-opening-ending-list-args.type';
import { GetOpeningEndingListResultsType } from '../models/results/get-opening-ending-list-results.type';
import { CreateOpeningEndingArgsType } from '../models/inputs/create-opening-ending-args.type';
import { UpdateOpeningEndingArgsType } from '../models/inputs/update-opening-ending-args.type';
import { CreateOpeningEndingResultsType } from '../models/results/create-opening-ending-results.type';
import { UpdateOpeningEndingResultsType } from '../models/results/update-opening-ending-results.type';
import { DeleteOpeningEndingResultsType } from '../models/results/delete-opening-ending-reslts.type';
import { OpeningEnding } from '../models/opening-ending.model';
import { GetOpeningEndingListSortArgsType } from '../models/inputs/get-opening-ending-list-sort-args.type';

import { OpeningEndingTransformerService } from './opening-ending-transformer.service';

@Injectable()
export class OpeningEndingService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly paginationService: PaginationService,
        private readonly opeTransformer: OpeningEndingTransformerService
    ) {}

    async getOpeningEnding(
        input: GetOpeningEndingArgsType
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

        return { success: true, opening_ending: openingEnding as any };
    }

    async getOpeningEndingList(
        input: GetOpeningEndingListArgsType,
        sort: GetOpeningEndingListSortArgsType,
        pages: PaginationArgsType
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
        input: CreateOpeningEndingArgsType
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
        input: UpdateOpeningEndingArgsType
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
