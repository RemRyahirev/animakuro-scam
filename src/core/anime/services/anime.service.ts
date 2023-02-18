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
import { FileUploadService } from 'common/services/file-upload.service';
import { CacheStatisticService } from '../../../common/cache/services';
import { UpdateRatingAnimeResultsType } from '../models/results/update-rating-anime-result.type';
import { Rating } from '../models/rating.model';
import { AnimeStillsPriorityType, AnimeStillsType } from '@prisma/client';

@Injectable()
export class AnimeService {
    bannerFiles;
    coverFiles;
    stills;

    constructor(
        private prisma: PrismaService,
        private fileUpload: FileUploadService,
        protected cacheStatisticService: CacheStatisticService,
        private paginationService: PaginationService,
    ) {
        this.bannerFiles = this.fileUpload.getStorageForOne('anime', 'banner_id', 'animeBanners');
        this.coverFiles = this.fileUpload.getStorageForOne('anime', 'cover_id', 'animeCovers');
        this.stills = this.fileUpload.getStorageForMany('animeStills', 'frame_id', 'animeStills', 50)
    }

    async getAnime(
        args: GetAnimeByIdInputType,
        user_id: string,
    ): Promise<GetAnimeResultsType> {
        const {
            id,
            max_authors_count,
            max_characters_count,
            max_similar_by_animes_count,
            max_related_by_animes_count,
            max_openings_count,
            max_endings_count,
            min_opening_start,
            min_ending_start,
            take_stills
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
                favourite_by: {
                    select: {
                        id: true,
                    },
                },
                banner: {
                    include: {
                        user: true,
                    },
                },
                cover: {
                    include: {
                        user: true,
                    },
                },
                stills: {
                    include: {
                        frame: true
                    },
                    orderBy: { priority: 'asc' },
                    take: take_stills
                }
            },
        });

        let openings;
        let endings;

        if (max_openings_count) {
            openings = await this.prisma.openingEnding.findMany({
                where: {
                    anime_id: id,
                    type: 'OPENING',
                    episode_end: { gte: min_opening_start },
                },
                orderBy: { episode_start: 'asc' },
                take: max_openings_count,
            });
        }
        if (max_endings_count) {
            endings = await this.prisma.openingEnding.findMany({
                where: {
                    anime_id: id,
                    type: 'ENDING',
                    episode_end: { gte: min_ending_start },
                },
                orderBy: { episode_start: 'asc' },
                take: max_endings_count,
            });
        }

        const opening_ending = [];
        if (openings) opening_ending.push(...openings);
        if (endings) opening_ending.push(...endings);

        const favourite = anime?.favourite_by.find((el) => el.id == user_id);

        return {
            success: true,
            errors: [],
            anime: {
                ...anime,
                opening_ending,
                openings,
                endings,
                is_favourite: favourite ?? false,
            } as any,
        };
    }

    async getAnimeList(
        args: PaginationInputType,
        user_id: string,
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
                opening_ending: {
                    orderBy: { episode_start: 'asc' },
                    take: 2,
                },
                favourite_by: {
                    select: {
                        id: true,
                    },
                },
                banner: {
                    include: {
                        user: true,
                    },
                },
                cover: {
                    include: {
                        user: true,
                    },
                },
                stills: {
                    include: {
                        frame: true,
                    },
                    orderBy: { priority: 'asc' },
                    take: 3
                }
            },
        });
        const pagination = await this.paginationService.getPagination(
            'anime',
            args,
        );

        const liked_anime = await this.prisma.anime.findMany({
            where: {
                favourite_by: {
                    some: { id: user_id },
                },
            },
            select: {
                id: true,
            },
        });
        const favourite_animes = liked_anime.map((el) => el.id);

        return {
            success: true,
            errors: [],
            anime_list: animeList.map((el) => ({
                ...el,
                is_favourite: favourite_animes.includes(el.id),
            })),
            pagination,
        };
    }

    async getRelatedAnimeListByAnimeId(
        id: string,
        args: PaginationInputType,
        user_id: string,
    ): Promise<GetListRelatedAnimeByAnimeIdResultsType> {
        const animeList = await this.prisma.relatingAnime.findMany({
            where: { parent_anime_id: id },
            ...transformPaginationUtil(args),
            include: {
                parent_anime: true,
                child_anime: true,
            },
        });

        const pagination = await this.paginationService.getPagination(
            'relatingAnime',
            args,
            // {
            //     nested_field: 'animes',
            //     search_property: 'id',
            //     search_value: id,
            // },
        );

        const liked_anime = await this.prisma.relatingAnime.findFirst({
            where: { parent_anime_id: id },
            include: {
                child_anime: {
                    include: {
                        favourite_by: {
                            where: {
                                id: user_id,
                            },
                        },
                    },
                },
            },
        });

        //@ts-ignore
        animeList[0].child_anime.is_favourite = !!liked_anime ?? false;

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
        user_id: string,
    ): Promise<GetListSimilarAnimeByAnimeIdResultsType> {
        const animeList: any = await this.prisma.similarAnime.findMany({
            where: { parent_anime_id: id },
            ...transformPaginationUtil(args),
            include: {
                parent_anime: true,
                child_anime: true,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'similarAnime',
            args,
            // {
            //     nested_field: 'animes',
            //     search_property: 'id',
            //     search_value: id,
            // },
        );

        const liked_anime = await this.prisma.similarAnime.findFirst({
            where: { parent_anime_id: id },
            include: {
                child_anime: {
                    include: {
                        favourite_by: {
                            where: {
                                id: user_id,
                            },
                        },
                    },
                },
            },
        });

        //@ts-ignore
        animeList[0].child_anime.is_favourite = !!liked_anime ?? false;

        return {
            success: true,
            errors: [],
            anime_list: animeList as any,
            pagination,
        };
    }

    async createAnime(
        input: CreateAnimeInputType,
        user_id: string,
    ): Promise<CreateAnimeResultsType> {
        const { stills_priority, ...args } = input;
        const anime = await this.prisma.anime.create({
            data: {
                ...entityUpdateUtil('genres', args),
                ...entityUpdateUtil('authors', args),
                ...entityUpdateUtil('characters', args),
                ...entityUpdateUtil('studios', args),
                ...relationAnimeUpdateUtil('related_by_animes', args),
                ...relationAnimeUpdateUtil('similar_by_animes', args),
                ...args,
                banner: await this.bannerFiles.tryCreate(args.banner, user_id),
                cover: await this.coverFiles.tryCreate(args.cover, user_id),
                stills: {
                    createMany: {
                        data: await Promise.all((await this.stills.tryCreate(args.stills, user_id))
                        ?.connect.map(async (e, i) => ({
                            frame_id: e.id, 
                            // @ts-ignore
                            type: AnimeStillsType[(await args.stills[i]).mimetype.split('/')[0].toUpperCase()], 
                            priority: stills_priority[i]})
                        )
                        ?? [])
                    }
                }
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
                banner: {
                    include: {
                        user: true,
                    },
                },
                cover: {
                    include: {
                        user: true,
                    },
                },
                stills: {
                    include: {
                        frame: true
                    }
                }
            },
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
        input: UpdateAnimeInputType,
        user_id: string,
    ): Promise<UpdateAnimeResultsType> {
        const {stills_priority, stills_delete, ...args} = input;

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
                banner: await this.bannerFiles.tryUpdate({ id: args.id }, args.banner, undefined, user_id),
                cover: await this.coverFiles.tryUpdate({ id: args.id }, args.cover, undefined, user_id),
                stills: {
                    deleteMany: { id: { in: stills_delete } },
                    createMany: {
                        data: await Promise.all((await this.stills.tryUpdate({ id: args.id }, args.stills, undefined, user_id))
                        ?.connect.slice(-args.stills.length).map(async (e, i) => {
                            return {
                                frame_id: e.id, 
                                // @ts-ignore
                                type: AnimeStillsType[(await args.stills[i]).mimetype.split('/')[0].toUpperCase()], 
                                priority: stills_priority[i]
                            }
                        }) ?? [])
                    },
                },
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
                banner: {
                    include: {
                        user: true,
                    },
                },
                cover: {
                    include: {
                        user: true,
                    },
                },
                stills: {
                    include: {
                        frame: true
                    }
                }
            },
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
        await Promise.all([
            this.bannerFiles.tryDeleteAll({ id }),
            this.coverFiles.tryDeleteAll({ id }),
        ]);
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
                banner: {
                    include: {
                        user: true,
                    },
                },
                cover: {
                    include: {
                        user: true,
                    },
                },
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

    private async updateStudioData(studios: any[]) {
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

    async updateRatingAnime(
        data: Rating,
    ): Promise<UpdateRatingAnimeResultsType> {
        let ratingResult: Rating;
        try {
            ratingResult = await this.prisma.ratingAnime.create({
                data,
            });
        } catch (error) {
            ratingResult = await this.prisma.ratingAnime.update({
                data,
                where: {
                    anime_id_user_id: {
                        anime_id: data.anime_id,
                        user_id: data.user_id,
                    },
                },
            });
        }
        return {
            success: true,
            errors: [],
            rating: ratingResult.rating,
        };
    }
}
