import { CreateAuthorInputType } from '../models/inputs/create-author-input.type';
import { UpdateAuthorInputType } from '../models/inputs/update-author-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetAuthorResultsType } from '../models/results/get-author-results.type';
import { GetListAuthorResultsType } from '../models/results/get-list-author-results.type';
import { GetListAuthorByAnimeIdResultsType } from '../models/results/get-list-author-by-anime-id-results.type';
import { DeleteAuthorResultsType } from '../models/results/delete-author-results.type';
import { UpdateAuthorResultsType } from '../models/results/update-author-results.type';
import { CreateAuthorResultsType } from '../models/results/create-author-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';

export class AuthorService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

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
            ...transformPaginationUtil(args),
        });
        const pagination = await this.paginationService.getPagination('author', args);
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
        const authorList = await this.prisma.author.findMany({
            ...transformPaginationUtil(args),
            where: {
                animes: {
                    some: {
                        id
                    }
                }
            }
        });
        const pagination = await this.paginationService.getPagination(
            "author",
            args,
            {
                nested_field: "animes",
                search_property: "id",
                search_value: id
            }
        );
        return {
            success: true,
            errors: [],
            authorList,
            pagination
        };
    }

    async createAuthor(
        args: CreateAuthorInputType,
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
