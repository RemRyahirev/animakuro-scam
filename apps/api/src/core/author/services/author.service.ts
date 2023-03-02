import { Injectable } from '@nestjs/common';

import { PaginationInputType } from '@app/common/models/inputs';
import { FileUploadService } from '@app/common/services/file-upload.service';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { StatisticService } from '@app/common/services/statistic.service';
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
        private statistics: StatisticService,
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
        favourite: boolean,
    ): Promise<GetAuthorResultsType> {
        const favourite_by_validation = {
            favourite_by: !user_id
                ? {
                      select: {
                          id: true,
                      },
                  }
                : {
                      where: {
                          id: user_id,
                      },
                      select: {
                          id: true,
                      },
                  },
        };
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
                        ...favourite_by_validation,
                    },
                },
                ...favourite_by_validation,
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

        const is_favourite_result = favourite &&
            user_id && {
                animes: author.animes.map((el: any) => ({
                    ...el,
                    is_favourite: el.favourite_by.length > 0 ? true : false,
                })),
                is_favourite: author.favourite_by.length > 0 ? true : false,
            };

        this.statistics.fireEvent(
            'getAuthor',
            {
                authorId: author.id,
            },
            1,
        );

        return {
            success: true,
            author: {
                ...author,
                ...is_favourite_result,
            } as any,
            errors: [],
        };
    }

    async getAuthorList(
        args: PaginationInputType,
        user_id: string,
        favourite: boolean,
    ): Promise<GetListAuthorResultsType> {
        const favourite_by_validation = {
            favourite_by: !user_id
                ? {
                      select: {
                          id: true,
                      },
                  }
                : {
                      where: {
                          id: user_id,
                      },
                      select: {
                          id: true,
                      },
                  },
        };
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
                        ...favourite_by_validation,
                    },
                },
                ...favourite_by_validation,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'author',
            args,
        );
        const is_favourite_result = (el: any) =>
            favourite &&
            user_id && {
                animes: el.animes.map((el: any) => ({
                    ...el,
                    is_favourite: el.favourite_by.length > 0 ? true : false,
                })),
                is_favourite: el.favourite_by.length > 0 ? true : false,
            };
        return {
            success: true,
            errors: [],
            author_list: authorList.map((el) => ({
                ...el,
                ...is_favourite_result(el),
            })) as any,
            pagination,
        };
    }

    async getAuthorListByAnimeId(
        id: string,
        args: PaginationInputType,
        user_id: string,
        favourite: boolean,
    ): Promise<GetListAuthorByAnimeIdResultsType> {
        const favourite_by_validation = {
            favourite_by: !user_id
                ? {
                      select: {
                          id: true,
                      },
                  }
                : {
                      where: {
                          id: user_id,
                      },
                      select: {
                          id: true,
                      },
                  },
        };
        const authorList = await this.prisma.author.findMany({
            ...transformPaginationUtil(args),
            where: {
                animes: {
                    some: {
                        id,
                    },
                },
            },
            include: {
                animes: {
                    include: {
                        ...favourite_by_validation,
                    },
                },
                ...favourite_by_validation,
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
        const is_favourite_result = (el: any) =>
            favourite &&
            user_id && {
                animes: el.animes?.map((el: any) => ({
                    ...el,
                    is_favourite: el.favourite_by.length > 0 ? true : false,
                })),
                is_favourite: el.favourite_by.length > 0 ? true : false,
            };
        return {
            success: true,
            errors: [],
            author_list: authorList.map((el) => ({
                ...el,
                ...is_favourite_result(el),
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
