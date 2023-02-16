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
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getAuthor(
        id: string,
        user_id: string,
    ): Promise<GetAuthorResultsType> {
        const author = await this.prisma.author.findUnique({
            where: {
                id,
            },
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true,
                        studios: true,
                    },
                },
                favourite_by: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (!author) {
            return {
                success: false,
                author: null,
            };
        }

        const favourite = author?.favourite_by.find((el) => el.id == user_id);
        if (favourite) {
            return {
                success: true,
                author: { ...author, is_favourite: true } as any,
                errors: [],
            };
        }

        return {
            success: true,
            author: author as any,
            errors: [],
        };
    }

    async getAuthorList(
        args: PaginationInputType,
        user_id: string,
    ): Promise<GetListAuthorResultsType> {
        const authorList: any = await this.prisma.author.findMany({
            ...transformPaginationUtil(args),
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true,
                        studios: true,
                    },
                },
                favourite_by: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'author',
            args,
        );

        for await (const author of authorList) {
            const favourite = author?.favourite_by.find(
                (el: any) => el.id == user_id,
            );
            if (favourite) {
                author.is_favourite = true;
            }
        }

        return {
            success: true,
            errors: [],
            author_list: authorList as any,
            pagination,
        };
    }

    async getAuthorListByAnimeId(
        id: string,
        args: PaginationInputType,
        user_id: string,
    ): Promise<GetListAuthorByAnimeIdResultsType> {
        const authorList: any = await this.prisma.author.findMany({
            ...transformPaginationUtil(args),
            where: {
                animes: {
                    some: {
                        id,
                    },
                },
                favourite_by: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'author',
            args,
            {
                nested_field: 'animes',
                search_property: 'id',
                search_value: id,
            },
        );

        for await (const author of authorList) {
            const favourite = author?.favourite_by.find(
                (el: any) => el.id == user_id,
            );
            if (favourite) {
                author.is_favourite = true;
            }
        }

        return {
            success: true,
            errors: [],
            author_list: authorList as any,
            pagination,
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
            author: author as any,
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
            author: author as any,
        };
    }

    async deleteAuthor(id: string): Promise<DeleteAuthorResultsType> {
        const author = await this.prisma.author.delete({
            where: { id },
        });
        return {
            success: true,
            author: author as any,
        };
    }
}
