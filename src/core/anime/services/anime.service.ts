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
import { relationAnimeUpdateUtil } from '../utils/relation-anime-update.util';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';
import { GetAnimeByIdInputType } from '../models/inputs/get-anime-by-id-input.type';
import { Studio } from '../../studio/models/studio.model';

@Injectable()
export class AnimeService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getAnime(args: GetAnimeByIdInputType): Promise<GetAnimeResultsType> {
        const {
            id,
            max_authors_count,
            max_characters_count,
            max_similar_by_animes_count,
            max_related_by_animes_count,
        } = args;

        const anime = await this.prisma.anime.findUnique({
            where: {
                id,
            },
            include: {
                genres: true,
                authors: {
                    take: max_authors_count,
                },
                characters: {
                    take: max_characters_count,
                },
                studios: true,
                related_by_animes: {
                    take: max_similar_by_animes_count,
                    include: {
                        child_anime: true,
                    },
                },
                similar_by_animes: {
                    take: max_related_by_animes_count,
                    include: {
                        child_anime: true,
                    },
                },
                airing_schedule: true,
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
                airing_schedule: true,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'anime',
            args,
        );
        return {
            success: true,
            errors: [],
            anime_list: animeList as any,
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
                ...relationAnimeUpdateUtil('related_by_animes', args),
                ...relationAnimeUpdateUtil('similar_by_animes', args),
                ...args,
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: {
                    include: {
                        animes: true,
                    },
                },
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
                airing_schedule: true,
            } as any,
        });

        if (anime && anime.studios) {
            await this.updateStudioData(anime.studios);
        }

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
                ...relationAnimeUpdateUtil('related_by_animes', args),
                ...relationAnimeUpdateUtil('similar_by_animes', args),
                ...args,
            },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: {
                    include: {
                        animes: true,
                    },
                },
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
                airing_schedule: true,
            } as any,
        });

        if (anime && anime.studios) {
            await this.updateStudioData(anime.studios);
        }

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
        const anime = (await this.prisma.anime.delete({
            where: { id },
            include: {
                genres: true,
                authors: true,
                characters: true,
                studios: {
                    include: {
                        animes: true,
                    },
                },
                relating_animes: true,
                similar_animes: true,
                airing_schedule: true,
            },
        })) as any;

        if (anime && anime.studios) {
            await this.updateStudioData(anime.studios);
        }

        return {
            success: true,
            errors: [],
            anime: anime as any,
        };
    }

    private async updateStudioData(studios: Studio[]) {
        studios.map(async (studio) => {
            const anime_count = await this.prisma.studio
                .findUnique({
                    where: { id: studio.id },
                    include: {
                        _count: {
                            select: {
                                animes: true,
                            },
                        },
                    },
                })
                .then((item) => item?._count.animes ?? 0);

            const animeYearArray: number[] = await this.prisma.anime
                .findMany({
                    where: {
                        id: {
                            in: studio.animes.map((anime: any) => anime.id),
                        },
                    },
                    orderBy: { year: 'asc' },
                })
                .then((animes) => animes.map((anime) => anime.year));

            await this.prisma.studio.update({
                where: {
                    id: studio.id,
                },
                data: {
                    anime_count,
                    anime_starts: animeYearArray[0],
                    anime_ends: animeYearArray[animeYearArray?.length - 1],
                },
            });
        });
    }
}
