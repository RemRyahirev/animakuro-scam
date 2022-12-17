import Database from '../../../database';
import { CreateAnimeInputType } from '../models/inputs/create-anime-input.type';
import { UpdateAnimeInputType } from '../models/inputs/update-anime-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { Anime } from '../models/anime.model';
import { PrismaClient } from '@prisma/client';
import { PaginationService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';

export class AnimeService {
    private readonly prisma: PrismaClient = Database.getInstance().logic;
    private readonly paginationService: PaginationService =
        new PaginationService('anime');

    async getAnimeInfo(id: string) {
        const anime = await this.getAnime(id);
        if (!anime) {
            return {
                success: false,
                anime: null,
                errors: ['Anime not found'],
            };
        }
        return {
            success: true,
            anime,
            errors: [],
        };
    }

    async getAnimeListInfo(args: PaginationInputType) {
        const animeList = await this.getAnimeList(args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            animeList,
            pagination,
        };
    }

    async createAnimeInfo(args: CreateAnimeInputType, ctx: ICustomContext) {
        const anime = await this.createAnime(args);
        return {
            success: true,
            anime,
        };
    }

    async updateAnimeInfo(args: UpdateAnimeInputType, ctx: ICustomContext) {
        const anime = await this.updateAnime(args);
        return {
            success: true,
            anime,
        };
    }

    async deleteAnimeInfo(id: string, ctx: ICustomContext) {
        const anime = await this.deleteAnime(id);
        return {
            success: true,
            anime,
        };
    }

    async getAnime(id: string): Promise<Anime | null> {
        return await this.prisma.anime.findUnique({
            where: {
                id,
            },
        });
    }

    async getAnimeList(args: PaginationInputType): Promise<Anime[]> {
        return await this.prisma.anime.findMany({
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
        });
    }

    async createAnime(args: CreateAnimeInputType): Promise<Anime> {
        return await this.prisma.anime.create({
            data: args,
        });
    }

    async updateAnime(args: UpdateAnimeInputType): Promise<Anime> {
        return await this.prisma.anime.update({
            where: { id: args.id },
            data: args,
        });
    }

    async deleteAnime(id: string) {
        return await this.prisma.anime.delete({
            where: { id },
        });
    }
}
