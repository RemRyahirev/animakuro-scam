import { Injectable } from '@nestjs/common';

import { PaginationInputType } from '@app/common/models/inputs';
import { FileUploadService } from '@app/common/services/file-upload.service';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { CreateAuthorInputType } from '../models/inputs/create-author-input.type';
import { UpdateAuthorInputType } from '../models/inputs/update-author-input.type';
import { GetAuthorResultsType } from '../models/results/get-author-results.type';
import { GetListAuthorResultsType } from '../models/results/get-list-author-results.type';
import { GetListAuthorByAnimeIdResultsType } from '../models/results/get-list-author-by-anime-id-results.type';
import { DeleteAuthorResultsType } from '../models/results/delete-author-results.type';
import { UpdateAuthorResultsType } from '../models/results/update-author-results.type';
import { CreateAuthorResultsType } from '../models/results/create-author-results.type';

@Injectable()
export class AuthorService {
    coverFiles;

    constructor(
        private prisma: PrismaService,
        private fileUpload: FileUploadService,
        private paginationService: PaginationService,
    ) {
        this.coverFiles = this.fileUpload.getStorageForOne('author', 'cover_id', 'authors');
    }

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
                cover: {
                    include: {
                        user: true,
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
                        cover: {
                            include: {
                                user: true,
                            },
                        },
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
        user_id: string,
    ): Promise<CreateAuthorResultsType> {
        const author = await this.prisma.author.create({
            data: {
                ...args,
                cover: await this.coverFiles.tryCreate(args.cover, user_id),
            },
        });
        return {
            success: true,
            author: author as any,
        };
    }

    async updateAuthor(
        args: UpdateAuthorInputType,
        user_id: string,
    ): Promise<UpdateAuthorResultsType> {
        const author = await this.prisma.author.update({
            where: { id: args.id },
            data: {
                ...args,
                cover: await this.coverFiles.tryUpdate({ id: args.id }, args.cover, undefined, user_id),
            },
        });
        return {
            success: true,
            author: author as any,
        };
    }

    async deleteAuthor(id: string): Promise<DeleteAuthorResultsType> {
        await this.coverFiles.tryDeleteAll({ id });
        const author = await this.prisma.author.delete({
            where: { id },
        });
        return {
            success: true,
            author: author as any,
        };
    }
}
