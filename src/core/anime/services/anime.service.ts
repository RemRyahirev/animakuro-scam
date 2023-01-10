import { CreateAnimeInputType } from '../models/inputs/create-anime-input.type';
import { UpdateAnimeInputType } from '../models/inputs/update-anime-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService, PrismaService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { GetListSimilarAnimeByAnimeIdResultsType } from '../models/results/get-list-similar-anime-by-anime-id-results.type';
import { AnimeApproval } from '../../../common/models/enums';
import { entityUpdateUtil } from '../../../common/utils/entity-update.util';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimeService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getAnime(id: string): Promise<GetAnimeResultsType> {
        const anime = await this.prisma.anime.findUnique({
            where: {
                id,
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: true,
            },
        });
        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async getAnimeList(
        args: PaginationInputType,
    ): Promise<GetListAnimeResultsType> {
        const animeList = await this.prisma.anime.findMany({
            ...transformPaginationUtil(args),
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: true,
           },
       });
        const pagination = await this.paginationService.getPagination('anime', args);
        return {
            success: true,
            errors: [],
            animeList: animeList as any,
            pagination,
       };
    }

    async getRelatedAnimeListByAnimeId(
        id: string,
        args: PaginationInputType,
    ): Promise<GetListRelatedAnimeByAnimeIdResultsType> {
        const animeList = await this.prisma.relatingAnime.findMany({
            where: { parent_anime_id: id },
            ...transformPaginationUtil(args),
            include: {
                parent_anime: true,
                child_anime: true,
            } as any,
        });
        const pagination = await this.paginationService.getPagination('relatingAnime', args, {
            nested_field: 'animes',
            search_property: 'id',
            search_value: id
        });
        return {
            success: true,
            errors: [],
            anime_list: animeList as any,
            pagination,
        };
    }

    async getSimilarAnimeListByAnimeId(
        id: string,
        args: PaginationInputType,
    ): Promise<GetListSimilarAnimeByAnimeIdResultsType> {
        const animeList = await this.prisma.similarAnime.findMany({
            where: { parent_anime_id: id },
            ...transformPaginationUtil(args),
            include: {
                parent_anime: true,
                child_anime: true,
            } as any,
        });
        const pagination = await this.paginationService.getPagination(
            'similarAnime',
            args,
            {
                nested_field: 'animes',
                search_property: 'id',
                search_value: id
            }
        );
        return {
            success: true,
            errors: [],
            anime_list: animeList as any,
            pagination,
        };
    }

    async createAnime(
        args: CreateAnimeInputType,
        ctx: ICustomContext,
    ): Promise<CreateAnimeResultsType> {
        const anime = await this.prisma.anime.create({
            data: {
                ...entityUpdateUtil('genres', args),
                ...entityUpdateUtil('authors', args),
                ...entityUpdateUtil('characters', args),
                ...entityUpdateUtil('studios', args),
                ...args,
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: true,
            } as any,
        });
        return {
            success: true,
            anime: anime as any,
        };
    }

    async updateAnime(
        args: UpdateAnimeInputType,
        ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        const anime = await this.prisma.anime.update({
            where: { id: args.id },
            data: {
                ...entityUpdateUtil('genres', args),
                ...entityUpdateUtil('authors', args),
                ...entityUpdateUtil('characters', args),
                ...entityUpdateUtil('studios', args),
                ...args,
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: true,
            } as any,
        });
        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async addRelatedAnime(
        args: UpdateAnimeInputType,
        ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        const { id, relating_animes_add, related_status } = args;

        for (let i = 0; i < relating_animes_add.length; i++) {
            await this.prisma.relatingAnime.create({
                data: {
                    parent_anime_id: id,
                    child_anime_id: relating_animes_add[i],
                    status: related_status[i],
                },
            });
        }

        const anime = await this.prisma.anime.findUnique({
            where: { id: args.id },
            include: {
                related_by_animes: true,
            } as any,
        });

        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async deleteRelatedAnime(
        args: UpdateAnimeInputType,
        ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        const { id, relating_animes_remove } = args;

        for (const relating of relating_animes_remove) {
            await this.prisma.relatingAnime.delete({
                where: {
                    child_anime_id_parent_anime_id: {
                        child_anime_id: relating,
                        parent_anime_id: id,
                    },
                },
            });
        }

        const anime = await this.prisma.anime.findUnique({
            where: { id },
        });

        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async addSimilarAnime(
        args: UpdateAnimeInputType,
        ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        const { id, similar_animes_add } = args;

        for (let i = 0; i < similar_animes_add.length; i++) {
            await this.prisma.similarAnime.create({
                data: {
                    parent_anime_id: id,
                    child_anime_id: similar_animes_add[i],
                    status: AnimeApproval.PENDING,
                },
            });
        }

        const anime = await this.prisma.anime.findUnique({
            where: { id: args.id },
            include: {
                similar_by_animes: true,
            } as any,
        });

        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async deleteSimilarAnime(
        args: UpdateAnimeInputType,
        ctx: ICustomContext,
    ): Promise<UpdateAnimeResultsType> {
        const { id, similar_animes_remove } = args;

        for (const similar of similar_animes_remove) {
            await this.prisma.similarAnime.delete({
                where: {
                    child_anime_id_parent_anime_id: {
                        child_anime_id: similar,
                        parent_anime_id: id,
                    },
                },
            });
        }

        const anime = await this.prisma.anime.findUnique({
            where: { id },
        });

        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async deleteAnime(
        id: string,
        ctx: ICustomContext,
    ): Promise<DeleteAnimeResultsType> {
        const anime = await this.prisma.anime.delete({
            where: { id },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: true,
            },
        });
        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }
}
