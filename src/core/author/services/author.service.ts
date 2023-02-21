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
import { FileUploadService } from 'common/services/file-upload.service';

@Injectable()
export class AuthorService {
    coverFiles;

    constructor(
        private prisma: PrismaService,
        private fileUpload: FileUploadService,
        private paginationService: PaginationService,
    ) {
        this.coverFiles = this.fileUpload.getStorageForOne(
            'author',
            'cover_id',
            'authors',
        );
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

        const liked_animes = await this.prisma.author.findMany({
            where: {
                id,
                animes: {
                    some: {
                        favourite_by: {
                            some: {
                                id: user_id,
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
                animes: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const is_liked = await this.prisma.author.findFirst({
            where: {
                id,
                favourite_by: {
                    some: {
                        id: user_id,
                    },
                },
            },
        });

        const favourite_animes: string[] = [];

        liked_animes.map((el) =>
            el.animes.map((els) => favourite_animes.push(els.id)),
        );

        return {
            success: true,
            author: {
                ...author,
                is_favourite: !!is_liked ?? false,
                animes: .map((els) => ({
                    is_favourite: favourite_animes.includes(els.id),
                })),
            } as any,
            errors: [],
        };
    }

    async getAuthorList(
        args: PaginationInputType,
        user_id: string,
    ): Promise<GetListAuthorResultsType> {
        const authorList = await this.prisma.author.findMany({
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
            },
        });
        const pagination = await this.paginationService.getPagination(
            'author',
            args,
        );

        const liked_authors = await this.prisma.author.findMany({
            where: {
                favourite_by: {
                    some: { id: user_id },
                },
            },
            select: {
                id: true,
            },
        });

        const liked_animes = await this.prisma.author.findMany({
            where: {
                animes: {
                    some: {
                        favourite_by: {
                            some: {
                                id: user_id,
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
                animes: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        const favourite_animes: string[] = [];

        const favourite_authors = liked_authors.map((el) => el.id);
        liked_animes.map((el) =>
            el.animes.map((els) => favourite_animes.push(els.id)),
        );

        return {
            success: true,
            errors: [],
            author_list: authorList.map((el) => ({
                ...el,
                is_favourite: favourite_authors.includes(el.id),
                //@ts-ignore
                animes: el.animes.map((els) => ({
                    ...els,
                    is_favourite: favourite_animes.includes(els.id),
                })),
            })) as any,
            pagination,
        };
    }

    async getAuthorListByAnimeId(
        id: string,
        args: PaginationInputType,
        user_id: string,
    ): Promise<GetListAuthorByAnimeIdResultsType> {
        const authorList = await this.prisma.author.findMany({
            ...transformPaginationUtil(args),
            where: {
                animes: {
                    some: {
                        id,
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

        const liked_authors = await this.prisma.author.findMany({
            where: {
                favourite_by: {
                    some: { id: user_id },
                },
                animes: {
                    some: {
                        id,
                    },
                },
            },
            select: {
                id: true,
            },
        });

        const liked_animes = await this.prisma.author.findMany({
            where: {
                animes: {
                    some: {
                        id,
                        favourite_by: {
                            some: {
                                id: user_id,
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
            },
        });

        const favourite_authors = liked_authors.map((el) => el.id);
        const favourite_animes = liked_animes.map((el) => el.id);

        return {
            success: true,
            errors: [],
            author_list: authorList.map((el) => ({
                ...el,
                is_favourite: favourite_authors.includes(el.id),
                animes: liked_animes.map((els) => ({
                    is_favourite: favourite_animes.includes(els.id),
                })),
            })) as any,
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
                cover: await this.coverFiles.tryUpdate(
                    { id: args.id },
                    args.cover,
                    undefined,
                    user_id,
                ),
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
