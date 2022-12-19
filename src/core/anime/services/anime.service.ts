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
            },
        });
        if (!anime) {
            return {
                success: false,
                anime: null,
            };
        }
        return {
            success: true,
            anime,
            errors: [],
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
            },
        });
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            animeList,
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
                genres: {
                    connect: [...this.connectGenres(args.genres)],
                },
            },
            include: {
                genres: true
            }
        });
        return {
            success: true,
            anime,
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
                genres: {
                    connect: [...this.connectGenres(args.genres ? args.genres : [])],
                },
            },
            include: {
                genres: true
            }
        });
        return {
            success: true,
            anime,
        };
    }

    async deleteAnime(
        id: string,
        ctx: ICustomContext,
    ): Promise<DeleteAnimeResultsType> {
        const anime = await this.prisma.anime.delete({
            where: { id },
        });
        return {
            success: true,
            anime,
        };
    }

    private connectGenres(argsArray: any[]) {
        let array: any[] = [];
        argsArray.forEach(id => {
            array.push({
                id
            })
        })
        return array;
    }
}
