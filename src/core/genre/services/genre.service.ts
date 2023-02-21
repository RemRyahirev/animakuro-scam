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
    async getGenre(id: string, user_id: string): Promise<GetGenreResultsType> {
        const genre = await this.prisma.genre.findUnique({
            where: {
                id,
            },
            include: {
                favourite_by: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (!genre) {
            return {
                success: false,
                genre: null,
            };
        }

        const favourite = genre.favourite_by.find((el) => el.id == user_id);

        if (favourite) {
            return {
                success: true,
                genre: { ...genre, is_favourite: true },
                errors: [],
            };
        }

        return {
            success: true,
            genre,
            errors: [],
        };
    }

    async getGenreList(
        args: PaginationInputType,
        user_id: string,
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

        for await (const genre of genreList) {
            const favourite = genre?.favourite_by.find(
                (el: any) => el.id == user_id,
            );
            if (favourite) {
                genre.is_favourite = true;
            }
        }

        return {
            success: true,
            errors: [],
            genre_list: genreList,
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
