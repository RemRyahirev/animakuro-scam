import { Injectable } from '@nestjs/common';

import { PaginationInputType } from '@app/common/models/inputs';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { CreateGenreInputType } from '../models/inputs/create-genre-input.type';
import { UpdateGenreInputType } from '../models/inputs/update-genre-input.type';
import { GetGenreResultsType } from '../models/results/get-genre-results.type';
import { GetListGenreResultsType } from '../models/results/get-list-genre-results.type';
import { CreateGenreResultsType } from '../models/results/create-genre-results.type';
import { UpdateGenreResultsType } from '../models/results/update-genre-results.type';
import { DeleteGenreResultsType } from '../models/results/delete-genre-results.type';

@Injectable()
export class GenreService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}
    async getGenre(
        id: string,
        user_id: string,
        favourite: boolean,
    ): Promise<GetGenreResultsType> {
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
        const genre = await this.prisma.genre.findUnique({
            where: {
                id,
            },
            include: {
                animes: {
                    include: {
                        characters: true,
                        authors: true,
                        studios: true,
                        ...favourite_by_validation,
                    },
                },
                ...favourite_by_validation,
            },
        });
        if (!genre) {
            return {
                success: false,
                genre: null,
            };
        }
        const is_favourite_result = favourite &&
            user_id && {
                animes: genre.animes.map((el: any) => ({
                    ...el,
                    is_favourite: el.favourite_by.length > 0 ? true : false,
                })),
                is_favourite: genre.favourite_by.length > 0 ? true : false,
            };

        return {
            success: true,
            genre: { ...genre, ...is_favourite_result },
            errors: [],
        };
    }

    async getGenreList(
        args: PaginationInputType,
        user_id: string,
        favourite: boolean,
    ): Promise<GetListGenreResultsType> {
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
        const genreList: any = await this.prisma.genre.findMany({
            ...transformPaginationUtil(args),
            include: {
                ...favourite_by_validation,
                animes: {
                    include: {
                        characters: true,
                        authors: true,
                        studios: true,
                        ...favourite_by_validation, 
                    },
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'genre',
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
            genre_list: genreList.map((el: any) => ({
                ...el,
                ...is_favourite_result(el),
            })),
            pagination,
        };
    }

    async createGenre(
        args: CreateGenreInputType,
    ): Promise<CreateGenreResultsType> {
        const genre = await this.prisma.genre.create({
            data: args,
        });
        return {
            success: true,
            genre,
        };
    }

    async updateGenre(
        args: UpdateGenreInputType,
    ): Promise<UpdateGenreResultsType> {
        const genre = await this.prisma.genre.update({
            where: { id: args.id },
            data: args,
        });
        return {
            success: true,
            genre,
        };
    }

    async deleteGenre(id: string): Promise<DeleteGenreResultsType> {
        const genre = await this.prisma.genre.delete({
            where: { id },
        });
        return {
            success: true,
            genre,
        };
    }
}
