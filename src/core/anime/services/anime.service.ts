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
import { AnimeStillsType, OpeningEndingType } from '@prisma/client';
import { Anime } from '../models/anime.model';
import { FavouriteInputType } from '../../../common/models/inputs/favourite-input.type';

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
        this.bannerFiles = this.fileUpload.getStorageForOne(
            'anime',
            'banner_id',
            'animeBanners',
        );
        this.coverFiles = this.fileUpload.getStorageForOne(
            'anime',
            'cover_id',
            'animeCovers',
        );
        this.stills = this.fileUpload.getStorageForMany(
            'animeStills',
            'frame_id',
            'animeStills',
            50,
        );
    }

    async getAnime(
        args: GetAnimeByIdInputType,
        user_id: string,
        favourites: boolean,
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
            take_stills,
        } = args;
        console.time('start');
        const anime: any = await this.prisma.anime.findUnique({
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
                    where: {
                        id: user_id,
                    },
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
                    take: take_stills,
                },
            },
        });
        const openings_endings_add = async (
            type: 'OPENING' | 'ENDING',
            take: number | undefined,
            gte: number | undefined,
        ) => {
            return await this.prisma.openingEnding.findMany({
                where: {
                    anime_id: id,
                    type,
                    episode_end: { gte },
                },
                orderBy: { episode_start: 'asc' },
                take,
            });
        };

        const openings = await openings_endings_add(
            'OPENING',
            max_openings_count,
            min_opening_start,
        );
        const endings = await openings_endings_add(
            'ENDING',
            max_endings_count,
            min_ending_start,
        );
        const opening_ending = [...openings, ...endings];

        const user_favourites: any =
            !!favourites &&
            (await this.prisma.user.findUnique({
                where: {
                    id: user_id,
                },
                include: {
                    favourite_authors: {
                        select: {
                            id: true,
                        },
                    },
                    favourite_characters: {
                        select: {
                            id: true,
                        },
                    },
                    favourite_studios: {
                        select: {
                            id: true,
                        },
                    },
                    favourite_genres: {
                        select: {
                            id: true,
                        },
                    },
                },
            }));

        const user_favourites_result = !!favourites && {
            characters: anime?.characters.map((el: { id: string }) => ({
                ...el,
                is_favourite: user_favourites?.favourite_characters.some(
                    (item: { id: string }) => item.id === el.id,
                ),
            })),
            genres: anime?.genres.map((el: { id: string }) => ({
                ...el,
                is_favourite: user_favourites?.favourite_genres.some(
                    (item: { id: string }) => item.id === el.id,
                ),
            })),
            studios: anime?.studios.map((el: { id: string }) => ({
                ...el,
                is_favourite: user_favourites?.favourite_studios.some(
                    (item: { id: string }) => item.id === el.id,
                ),
            })),
            authors: anime?.authors.map((el: { id: string }) => ({
                ...el,
                is_favourite: user_favourites?.favourite_authors.some(
                    (item: { id: string }) => item.id === el.id,
                ),
            })),
        };
        console.timeEnd('start');
        return {
            success: true,
            errors: [],
            anime: {
                ...anime,
                opening_ending,
                openings,
                endings,
                is_favourite: anime?.favourite_by.length > 0 ? true : false,
                ...user_favourites_result,
            } as any,
        };
    }

    async getAnimeList(
        args: PaginationInputType,
        user_id: string,
        favourites: FavouriteInputType,
    ): Promise<GetListAnimeResultsType> {
        const animeList: any = await this.prisma.anime.findMany({
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
                    take: 3,
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'anime',
            args,
        );

        const favourite_genres: string[] = [];
        const favourite_authors: string[] = [];
        const favourite_characters: string[] = [];
        const favourite_studios: string[] = [];
        const favourite: string[] = [];

        const [liked]: any = await this.prisma.user.findMany({
            where: {
                id: user_id,
            },
            select: {
                favourite_animes: {
                    select: {
                        id: true,
                    },
                },
                favourite_authors: {
                    select: {
                        id: true,
                    },
                },
                favourite_characters: {
                    select: {
                        id: true,
                    },
                },
                favourite_genres: {
                    select: {
                        id: true,
                    },
                },
                favourite_studios: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (
            favourites.authors_favourite &&
            liked.favourite_authors.length != 0
        ) {
            liked.favourite_authors.map((el: any) =>
                favourite_authors.push(el.id),
            );
        }

        if (
            favourites.characters_favourite &&
            liked.favourite_characters != 0
        ) {
            liked.favourite_characters.map((el: any) =>
                favourite_characters.push(el.id),
            );
        }

        if (favourites.genres_favourite && liked.favourite_genres != 0) {
            liked.favourite_genres.map((el: any) =>
                favourite_genres.push(el.id),
            );
        }

        if (favourites.studios_favourite && liked.favourite_studios != 0) {
            liked.favourite_studios.map((el: any) =>
                favourite_studios.push(el.id),
            );
        }

        if (favourites.animes_favourite && liked.favourite_animes != 0) {
            liked.favourite_animes.map((el: any) => {
                favourite.push(el.id);
            });
        }

        return {
            success: true,
            errors: [],
            anime_list: animeList.map((el: Anime) => ({
                ...el,
                is_favourite: favourite.includes(el.id ?? ''),
                characters: el?.characters?.map((els) => ({
                    ...els,
                    is_favourite: favourite_characters.includes(els.id),
                })),
                genres: el?.genres?.map((els) => ({
                    ...els,
                    is_favourite: favourite_genres.includes(els.id ?? ''),
                })),
                studios: el?.studios?.map((els) => ({
                    ...els,
                    is_favourite: favourite_studios.includes(el.id ?? ''),
                })),
                authors: el?.authors?.map((els) => ({
                    ...els,
                    is_favourite: favourite_authors.includes(el.id ?? ''),
                })),
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

        const liked_animes = await this.prisma.relatingAnime.findMany({
            where: {
                parent_anime_id: id,
                child_anime: {
                    favourite_by: {
                        some: {
                            id: user_id,
                        },
                    },
                },
            },
            select: {
                child_anime: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const favourite_animes: string[] = liked_animes.map(
            (el) => el.child_anime.id,
        );

        animeList.map((el) =>
            favourite_animes.includes(el.child_anime_id)
                ? ((el as any).child_anime.is_favourite = true)
                : false,
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
        user_id: string,
    ): Promise<GetListSimilarAnimeByAnimeIdResultsType> {
        const animeList = await this.prisma.similarAnime.findMany({
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

        const liked_animes = await this.prisma.similarAnime.findMany({
            where: {
                parent_anime_id: id,
                child_anime: {
                    favourite_by: {
                        some: {
                            id: user_id,
                        },
                    },
                },
            },
            select: {
                child_anime: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const favourite_animes: string[] = liked_animes.map(
            (el) => el.child_anime.id,
        );

        animeList.map((el) =>
            favourite_animes.includes(el.child_anime_id)
                ? ((el as any).child_anime.is_favourite = true)
                : false,
        );

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
                                priority: stills_priority[i]
                            })
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
        const { stills_priority, stills_delete, ...args } = input;

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
