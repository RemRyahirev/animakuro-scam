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
import { GetListConnectedAnimeByAnimeIdResultsType } from '../models/results/get-list-connected-anime-by-anime-id-results.type';

import { entityConnectUtil } from '../../../common/utils/entity-connect.util';

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
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
            include: {
                genres: true,
                authors: true,
                characters: true,
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

    async getConnectedAnimeListByAnimeId(
        id: string,
        args: PaginationInputType,
    ): Promise<GetListConnectedAnimeByAnimeIdResultsType> {
        const connectedAnimeList = await this.prisma.anime.findMany({
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
            where: {
                animes: {
                    some: {
                        id,
                    },
                },
            },
        });
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            authorList,
            pagination,
        };
    }

    async createAnime(
        args: CreateAnimeInputType,
        ctx: ICustomContext,
    ): Promise<CreateAnimeResultsType> {
        const anime = await this.prisma.anime.create({
            data: {
                ...args,
                ...entityConnectUtil('genres', args),
                ...entityConnectUtil('authors', args),
                ...entityConnectUtil('characters', args),
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
            },
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
                ...args,
                ...entityConnectUtil('genres', args),
                ...entityConnectUtil('authors', args),
                ...entityConnectUtil('characters', args),
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
            },
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
            },
        });
        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }
}
