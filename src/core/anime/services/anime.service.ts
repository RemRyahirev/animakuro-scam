import { Database } from '../../../loaders';
import { CreateAnimeInputType } from '../models/inputs/create-anime-input.type';
import { UpdateAnimeInputType } from '../models/inputs/update-anime-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { entityUpdateUtil } from '../../../common/utils/entity-update.util';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';

export class AnimeService {
    private readonly prisma = new Database().logic;
    private readonly paginationService: PaginationService =
        new PaginationService('anime');

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
        const pagination = await this.paginationService.getPagination(args);
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
        const relatedAnimeList = await this.prisma.anime.findMany({
            ...transformPaginationUtil(args),
            where: {
                related_animes: {
                    some: {
                        id,
                    },
                },
            } as any,
        });
        const pagination = await this.paginationService.getPagination(args, {
            nested_field: 'animes',
            search_property: 'id',
            search_value: id
        });
        return {
            success: true,
            errors: [],
            related_animes: relatedAnimeList as any,
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
                ...entityUpdateUtil('related_animes', args),
                ...args,
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: true,
                related_animes: true,
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
                ...entityUpdateUtil('related_animes', args),
                ...args,
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: true,
                related_animes: true,
            } as any,
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
