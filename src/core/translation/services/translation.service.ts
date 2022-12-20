import { Database } from '../../../loaders';
import { PaginationInputType } from '../../../common/models/inputs';
import { CreateTranslationInputType } from '../models/inputs/create-translation-input.type';
import { UpdateTranslationInputType } from '../models/inputs/update-translation-input.type';
import { PaginationService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';
import { GetTranslationResultsType } from '../models/results/get-translation-results.type';
import { GetListTranslationResultsType } from '../models/results/get-list-translation-results.type';
import { CreateTranslationResultsType } from '../models/results/create-translation-results.type';
import { UpdateTranslationResultsType } from '../models/results/update-translation-results.type';
import { DeleteTranslationResultsType } from '../models/results/delete-translation-results.type';

export class TranslationService {
    private readonly prisma = new Database().logic;
    protected readonly paginationService: PaginationService =
        new PaginationService('translation');

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
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
        });
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            translationList,
            pagination,
        };
    }

    async createTranslation(
        args: CreateTranslationInputType,
        ctx: ICustomContext,
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
        ctx: ICustomContext,
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
        ctx: ICustomContext,
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
