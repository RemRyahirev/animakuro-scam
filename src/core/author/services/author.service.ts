import { Database } from '../../../loaders';
import { CreateAuthorInputType } from '../models/inputs/create-author-input.type';
import { UpdateAuthorInputType } from '../models/inputs/update-author-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';
import { GetAuthorResultsType } from '../models/results/get-author-results.type';
import { GetListAuthorResultsType } from '../models/results/get-list-author-results.type';
import { GetListAuthorByAnimeIdResultsType } from '../models/results/get-list-author-by-anime-id-results.type';
import { DeleteAuthorResultsType } from '../models/results/delete-author-results.type';
import { UpdateAuthorResultsType } from '../models/results/update-author-results.type';
import { CreateAuthorResultsType } from '../models/results/create-author-results.type';

export class AuthorService {
    private readonly prisma = new Database().logic;
    private readonly paginationService: PaginationService =
        new PaginationService('author');

    async getAuthor(id: string): Promise<GetAuthorResultsType> {
        const author = await this.prisma.author.findUnique({
            where: {
                id,
            },
        });
        if (!author) {
            return {
                success: false,
                author: null,
            };
        }
        return {
            success: true,
            author,
            errors: [],
        };
    }

    async getAuthorList(
        args: PaginationInputType,
    ): Promise<GetListAuthorResultsType> {
        const authorList = await this.prisma.author.findMany({
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
        });
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            authorList,
            pagination,
        };
    }

    async getAuthorListByAnimeId(
        id: string,
        args: PaginationInputType,
    ): Promise<GetListAuthorByAnimeIdResultsType> {
        const anime = await this.prisma.anime.findUnique({
            where: {
                id,
            },
            include: {
                authors: true,
            },
        });
        const pagination = await this.paginationService.getPagination(args);

        if (!anime) {
            return {
                success: false,
                authorList: [],
                pagination,
            };
        }

        const authorList = anime?.authors;

        return {
            success: true,
            errors: [],
            authorList,
            pagination,
        };
    }

    async createAuthor(
        args: CreateAuthorInputType,
        ctx: ICustomContext,
    ): Promise<CreateAuthorResultsType> {
        const author = await this.prisma.author.create({
            data: args,
        });
        return {
            success: true,
            author,
        };
    }

    async updateAuthor(
        args: UpdateAuthorInputType,
        ctx: ICustomContext,
    ): Promise<UpdateAuthorResultsType> {
        const author = await this.prisma.author.update({
            where: { id: args.id },
            data: args,
        });
        return {
            success: true,
            author,
        };
    }

    async deleteAuthor(
        id: string,
        ctx: ICustomContext,
    ): Promise<DeleteAuthorResultsType> {
        const author = await this.prisma.author.delete({
            where: { id },
        });
        return {
            success: true,
            author,
        };
    }
}
