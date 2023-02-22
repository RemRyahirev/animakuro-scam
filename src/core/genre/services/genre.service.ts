import { PaginationInputType } from '../../../common/models/inputs';
import { CreateGenreInputType } from '../models/inputs/create-genre-input.type';
import { UpdateGenreInputType } from '../models/inputs/update-genre-input.type';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetGenreResultsType } from '../models/results/get-genre-results.type';
import { GetListGenreResultsType } from '../models/results/get-list-genre-results.type';
import { CreateGenreResultsType } from '../models/results/create-genre-results.type';
import { UpdateGenreResultsType } from '../models/results/update-genre-results.type';
import { DeleteGenreResultsType } from '../models/results/delete-genre-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';

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
                        genres: true,
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
        const genreList: any = await this.prisma.genre.findMany({
            ...transformPaginationUtil(args),
            include: {
                favourite_by: {
                    select: {
                        id: true,
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
