import { PaginationInputType } from '../../../common/models/inputs';
import { CreateTranslationInputType } from '../models/inputs/create-translation-input.type';
import { UpdateTranslationInputType } from '../models/inputs/update-translation-input.type';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetTranslationResultsType } from '../models/results/get-translation-results.type';
import { GetListTranslationResultsType } from '../models/results/get-list-translation-results.type';
import { CreateTranslationResultsType } from '../models/results/create-translation-results.type';
import { UpdateTranslationResultsType } from '../models/results/update-translation-results.type';
import { DeleteTranslationResultsType } from '../models/results/delete-translation-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TranslationService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getTranslation(id: string): Promise<GetTranslationResultsType> {
        const translation = await this.prisma.translation.findUnique({
            where: {
                id,
            },
        });
        if (!translation) {
            return {
                success: false,
                translation: null,
            };
        }
        return {
            success: true,
            translation,
            errors: [],
        };
    }

    async getTranslationList(
        args: PaginationInputType,
    ): Promise<GetListTranslationResultsType> {
        const translationList = await this.prisma.translation.findMany({
            ...transformPaginationUtil(args),
        });
        const pagination = await this.paginationService.getPagination('translation', args);
        return {
            success: true,
            errors: [],
            translation_list: translationList,
            pagination,
        };
    }

    async createTranslation(
        args: CreateTranslationInputType,
    ): Promise<CreateTranslationResultsType> {
        const translation = await this.prisma.translation.create({
            data: args,
        });
        return {
            success: true,
            translation,
        };
    }

    async updateTranslation(
        args: UpdateTranslationInputType,
    ): Promise<UpdateTranslationResultsType> {
        const translation = await this.prisma.translation.update({
            where: { id: args.id },
            data: args,
        });
        return {
            success: true,
            translation,
        };
    }

    async deleteTranslation(
        id: string,
    ): Promise<DeleteTranslationResultsType> {
        const translation = await this.prisma.translation.delete({
            where: { id },
        });
        return {
            success: true,
            translation,
        };
    }
}
