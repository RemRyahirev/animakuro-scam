import { CreateAnimeInputType } from '../models/inputs/create-anime-input.type';
import { UpdateAnimeInputType } from '../models/inputs/update-anime-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { GetListSimilarAnimeByAnimeIdResultsType } from '../models/results/get-list-similar-anime-by-anime-id-results.type';
import { AnimeApproval, AnimeRelation } from '../../../common/models/enums';
import { entityUpdateUtil } from '../../../common/utils/entity-update.util';
import { relationUpdateUtil } from '../../../common/utils/relation-update.util';
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
                related_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
                similar_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
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
                related_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
                similar_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'anime',
            args,
        );
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
        const pagination = await this.paginationService.getPagination(
            'relatingAnime',
            args,
            {
                nested_field: 'animes',
                search_property: 'id',
                search_value: id,
            },
        );
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
                search_value: id,
            },
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
    ): Promise<CreateAnimeResultsType> {
        const anime = await this.prisma.anime.create({
            data: {
                ...entityUpdateUtil('genres', args),
                ...entityUpdateUtil('authors', args),
                ...entityUpdateUtil('characters', args),
                ...entityUpdateUtil('studios', args),
                ...relationUpdateUtil('related_by_animes', args),
                ...relationUpdateUtil('similar_by_animes', args),
                ...args,
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: true,
                related_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
                similar_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
            } as any,
        });
        console.log(anime);
        return {
            success: true,
            anime: anime as any,
        };
    }

    async updateAnime(
        args: UpdateAnimeInputType,
    ): Promise<UpdateAnimeResultsType> {
        const anime = await this.prisma.anime.update({
            where: { id: args.id },
            data: {
                ...entityUpdateUtil('genres', args),
                ...entityUpdateUtil('authors', args),
                ...entityUpdateUtil('characters', args),
                ...entityUpdateUtil('studios', args),
                ...relationUpdateUtil('related_by_animes', args),
                ...relationUpdateUtil('similar_by_animes', args),
                ...args,
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: true,
                related_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
                similar_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
            } as any,
        });
        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async addRelatedAnime(
        id: string,
        relating_animes_add: string[],
        related_status: AnimeRelation[],
    ): Promise<UpdateAnimeResultsType> {
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
            where: { id },
            include: {
                related_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
            } as any,
        });

        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async updateRelatedAnime(
        id: string,
        relating_animes_add: string[],
        related_status: AnimeRelation[],
    ): Promise<UpdateAnimeResultsType> {
        for (let i = 0; i < relating_animes_add.length; i++) {
            await this.prisma.relatingAnime.update({
                where: {
                    child_anime_id_parent_anime_id: {
                        parent_anime_id: id,
                        child_anime_id: relating_animes_add[i],
                    },
                },
                data: {
                    status: related_status[i],
                },
            });
        }

        const anime = await this.prisma.anime.findUnique({
            where: { id },
            include: {
                related_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
            },
        });

        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async deleteRelatedAnime(
        id: string,
        relating_animes_remove: string[],
    ): Promise<UpdateAnimeResultsType> {
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
        id: string,
        similar_animes_add: string[],
    ): Promise<UpdateAnimeResultsType> {
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
            where: { id },
            include: {
                similar_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
            } as any,
        });

        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async updateSimilarAnime(
        id: string,
        similar_animes_add: string[],
        status: AnimeApproval[],
    ): Promise<UpdateAnimeResultsType> {
        for (let i = 0; i < similar_animes_add.length; i++) {
            await this.prisma.similarAnime.update({
                where: {
                    child_anime_id_parent_anime_id: {
                        parent_anime_id: id,
                        child_anime_id: similar_animes_add[i],
                    },
                },
                data: {
                    status: status[i],
                },
            });
        }

        const anime = await this.prisma.anime.findUnique({
            where: { id },
            include: {
                similar_by_animes: {
                    include: {
                        child_anime: true,
                    },
                },
            },
        });

        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    async deleteSimilarAnime(
        id: string,
        similar_animes_remove: string[],
    ): Promise<UpdateAnimeResultsType> {
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

    async deleteAnime(id: string): Promise<DeleteAnimeResultsType> {
        const anime = await this.prisma.anime.delete({
            where: { id },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: true,
                relating_animes: true,
                similar_animes: true,
            },
        });
        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }
}
