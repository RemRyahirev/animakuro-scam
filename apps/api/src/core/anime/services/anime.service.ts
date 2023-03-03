import { Injectable } from '@nestjs/common';
import { AnimeStillsType, OpeningEndingType, RatingAnime } from '@prisma/client';

import { AnimeApproval, AnimeRelation } from '@app/common/models/enums';
import {
    PaginationInputType,
    FavouriteInputType,
} from '@app/common/models/inputs';
import { FileUploadService } from '@app/common/services/file-upload.service';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { StatisticService } from '@app/common/services/statistic.service';
import { entityUpdateUtil } from '@app/common/utils/entity-update.util';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { CreateAnimeInputType } from '../models/inputs/create-anime-input.type';
import { UpdateAnimeInputType } from '../models/inputs/update-anime-input.type';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { GetListSimilarAnimeByAnimeIdResultsType } from '../models/results/get-list-similar-anime-by-anime-id-results.type';
import { relationAnimeUpdateUtil } from '../utils/relation-anime-update.util';
import { GetAnimeByIdInputType } from '../models/inputs/get-anime-by-id-input.type';
import { UpdateRatingAnimeResultsType } from '../models/results/update-rating-anime-result.type';
import { Rating } from '../models/rating.model';
import { Anime } from '../models/anime.model';
import { GetStillsByAnimeIdResultsType } from '../models/results/get-stills-by-animeId-results.type';
import { GetStillsByAnimeIdInputType } from '../models/inputs/get-stills-by-animeId-input.type';
import { DeleteAnimeStillsInputType } from '../models/inputs/delete-anime-stills-input.type';
import { DeleteAnimeStillsResultsType } from '../models/results/delete-anime-stills-results.type';
import { AddAnimeStillsResultsType } from '../models/results/add-anime-stills-results.type';
import { AddAnimeStillsInputType } from '../models/inputs/add-anime-stills-input.type';
import { UpdateAnimeStillsInputType } from '../models/inputs/update-anime-stills-input.type';
import { UpdateAnimeStillsResultsType } from '../models/results/update-anime-stills-results.type';
import { GetAnimeListInputType } from '../models/inputs/get-anime-list-input.type';

@Injectable()
export class AnimeService {
    bannerFiles;
    coverFiles;
    stillsFiles;

    constructor(
        private prisma: PrismaService,
        private fileUpload: FileUploadService,
        private paginationService: PaginationService,
        private statistics: StatisticService,
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
        this.stillsFiles = this.fileUpload.getStorageForMany(
            'animeStills',
            'frame_id',
            'animeStills',
            50,
        );
    }

    async getAnime(
        args: GetAnimeByIdInputType,
        user_id: string,
        profile_id: string,
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
            max_stills,
        } = args;
        const favouriteSelect = !!favourites && {
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
            favourite_collections: {
                select: {
                    id: true,
                },
            },
        };

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
                user_folders: true,
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
                favourite_by: !profile_id
                    ? {
                          select: {
                              id: true,
                          },
                      }
                    : {
                          where: {
                              id: profile_id,
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
                    take: max_stills,
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

        const favorites_by: any = await this.prisma.userProfile.findUnique({
            where: {
                id: profile_id,
            },
            select: {
                ...favouriteSelect,
            },
        });

        const user_favourites_result = !!favourites &&
            user_id && {
                is_favourite: anime?.favourite_by.length > 0 ? true : false,
                characters: anime?.characters.map((el: { id: string }) => ({
                    ...el,
                    is_favourite: favorites_by?.favourite_characters.some(
                        (item: { id: string }) => item.id === el.id,
                    ),
                })),
                genres: anime?.genres.map((el: { id: string }) => ({
                    ...el,
                    is_favourite: favorites_by?.favourite_genres.some(
                        (item: { id: string }) => item.id === el.id,
                    ),
                })),
                studios: anime?.studios.map((el: { id: string }) => ({
                    ...el,
                    is_favourite: favorites_by?.favourite_studios.some(
                        (item: { id: string }) => item.id === el.id,
                    ),
                })),
                authors: anime?.authors.map((el: { id: string }) => ({
                    ...el,
                    is_favourite: favorites_by?.favourite_authors.some(
                        (item: { id: string }) => item.id === el.id,
                    ),
                })),
                user_folders: anime?.user_folders.map((el: { id: string }) => ({
                    ...el,
                    is_favourite: favorites_by?.favourite_collections.some(
                        (item: { id: string }) => item.id === el.id,
                    ),
                })),
            };

        this.statistics.fireEvent(
            'getAnime',
            {
                animeId: anime.id,
            },
            1,
        );

        return {
            success: true,
            errors: [],
            anime: {
                ...anime,
                opening_ending,
                openings,
                endings,
                ...user_favourites_result,
            } as any,
        };
    }

    async getAnimeList(
        input: GetAnimeListInputType,
        args: PaginationInputType,
        user_id: string,
        profile_id: string,
        favourites: boolean,
    ): Promise<GetListAnimeResultsType> {
        const favouriteSelect = !!favourites && {
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
            favourite_collections: {
                select: {
                    id: true,
                },
            },
        };

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
                favourite_by: !profile_id
                    ? {
                          select: {
                              id: true,
                          },
                      }
                    : {
                          where: {
                              id: profile_id,
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
                    take: input.max_stills,
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'anime',
            args,
        );
        const favorites_by: any = await this.prisma.userProfile.findUnique({
            where: {
                id: profile_id,
            },
            select: {
                ...favouriteSelect,
            },
        });
        const user_favourites_result = (el: any) =>
            !!favourites &&
            user_id && {
                is_favourite: el?.favourite_by.length > 0,
                characters: el?.characters?.map((els: any) => ({
                    ...els,
                    is_favourite: favorites_by?.favourite_characters.some(
                        (item: { id: string }) => item.id === els.id,
                    ),
                })),
                genres: el?.genres?.map((els: any) => ({
                    ...els,
                    is_favourite: favorites_by?.favourite_genres.some(
                        (item: { id: string }) => item.id === els.id,
                    ),
                })),
                studios: el?.studios?.map((els: any) => ({
                    ...els,
                    is_favourite: favorites_by?.favourite_studios.some(
                        (item: { id: string }) => item.id === els.id,
                    ),
                })),
                authors: el?.authors?.map((els: any) => ({
                    ...els,
                    is_favourite: favorites_by?.favourite_authors.some(
                        (item: { id: string }) => item.id === els.id,
                    ),
                })),
                user_folders: el?.user_folders.map((el: { id: string }) => ({
                    ...el,
                    is_favourite: favorites_by?.favourite_collections.some(
                        (item: { id: string }) => item.id === el.id,
                    ),
                })),
            };

        return {
            success: true,
            errors: [],
            anime_list: animeList.map((el: any) => ({
                ...el,
                ...user_favourites_result(el),
            })),
            pagination,
        };
    }

    async getRelatedAnimeListByAnimeId(
        id: string,
        args: PaginationInputType,
        user_id: string,
        profile_id: string,
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
                            id: profile_id,
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
        profile_id: string,
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
                            id: profile_id,
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

    async getStillsByAnimeId(
        input: GetStillsByAnimeIdInputType,
        page: PaginationInputType,
    ): Promise<GetStillsByAnimeIdResultsType> {
        const stills = await this.prisma.anime.findUnique({
            where: { id: input.anime_id },
            include: {
                stills: {
                    orderBy: { [input.sort_field]: input.sort_order },
                    ...transformPaginationUtil(page),
                    include: {
                        frame: true,
                    },
                },
            },
        });

        const pagination = await this.paginationService.getPagination(
            'animeStills',
            page,
        );

        return {
            stills: stills as any,
            success: true,
            pagination,
        };
    }

    async createAnime(
        input: CreateAnimeInputType,
        user_id: string,
    ): Promise<CreateAnimeResultsType> {
        const { ...args } = input;

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
                        frame: true,
                    },
                },
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
        const { ...args } = input;

        const studiosToAdd = (args.studios_add ?? []).slice();
        const genresToAdd = (args.genres_add ?? []).slice();
        const studiosToRemove = (args.studios_remove ?? []).slice();
        const genresToRemove = (args.genres_remove ?? []).slice();
        const oldAnime = await this.prisma.anime.findUnique({
            where: { id: args.id },
            select: {
                type: true,
                genres: {
                    select: {
                        id: true,
                    },
                },
                studios: {
                    select: {
                        id: true,
                    },
                },
            },
        });

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
                banner: await this.bannerFiles.tryUpdate(
                    { id: args.id },
                    args.banner,
                    undefined,
                    user_id,
                ),
                cover: await this.coverFiles.tryUpdate(
                    { id: args.id },
                    args.cover,
                    undefined,
                    user_id,
                ),
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
                        frame: true,
                    },
                },
            },
        });

        if (anime && anime.studios) {
            await this.updateStudioData(anime.studios);
        }

        if (oldAnime && oldAnime?.type !== anime.type) {
            this.statistics.fireEvent(
                'animeType',
                {
                    animeId: anime.id,
                    animeType: oldAnime.type,
                },
                -1,
            );
            this.statistics.fireEvent(
                'animeType',
                {
                    animeId: anime.id,
                    animeType: anime.type,
                },
                1,
            );
        }

        const oldAnimeGenreIds = oldAnime?.genres.map(el => el.id) ?? [];
        genresToAdd.forEach(genreId => {
            if (oldAnimeGenreIds.includes(genreId)) {
                // already exists
                return;
            }

            this.statistics.fireEvent(
                'animeGenre',
                {
                    animeId: anime.id,
                    genreId,
                },
                1,
            );
        });
        genresToRemove.forEach(genreId => {
            if (!oldAnimeGenreIds.includes(genreId)) {
                // never exists
                return;
            }

            this.statistics.fireEvent(
                'animeGenre',
                {
                    animeId: anime.id,
                    genreId,
                },
                -1,
            );
        });

        const oldAnimeStudiosIds = oldAnime?.studios.map(el => el.id) ?? [];
        studiosToAdd.forEach(studioId => {
            if (oldAnimeStudiosIds.includes(studioId)) {
                // already exists
                return;
            }

            this.statistics.fireEvent(
                'animeStudio',
                {
                    animeId: anime.id,
                    studioId,
                },
                1,
            );
        });
        studiosToRemove.forEach(studioId => {
            if (!oldAnimeStudiosIds.includes(studioId)) {
                // never exists
                return;
            }

            this.statistics.fireEvent(
                'animeStudio',
                {
                    animeId: anime.id,
                    studioId,
                },
                -1,
            );
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
                stills: {
                    include: {
                        frame: true,
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
        let ratingResult: RatingAnime;

        const existRating = await this.prisma.ratingAnime.findUnique({
            where: {
                anime_id_user_profile_id: data,
            },
        });

        if (existRating) {
            ratingResult = await this.prisma.ratingAnime.update({
                data,
                where: {
                    anime_id_user_profile_id: data,
                },
            });
            this.statistics.fireEvent(
                'animeRate',
                {
                    animeId: data.anime_id,
                    stars: existRating.rating,
                },
                -1,
            );
        } else {
            ratingResult = await this.prisma.ratingAnime.create({
                data,
            });
        }

        this.statistics.fireEvent(
            'animeRate',
            {
                animeId: data.anime_id,
                stars: data.rating,
            },
            1,
        );

        return {
            success: true,
            errors: [],
            rating: ratingResult.rating,
        };
    }

    async addAnimeStills(
        input: AddAnimeStillsInputType,
        user_id: string,
    ): Promise<AddAnimeStillsResultsType> {
        const toLink = input.stills.filter((stillItem) => stillItem.url);
        const toCDN = input.stills
            .filter((stillItem) => !stillItem.url)
            // @ts-ignore
            .map((e) => ({ ...e, still: input.stills_files[e.still_index] }));

        // @ts-ignore
        const fromCDN = await Promise.all(
            (
                await this.stillsFiles.tryCreate(
                    toCDN.map((e) => e.still),
                    user_id,
                )
            )?.connect.map(async (e, i) => ({
                anime_id: input.anime_id,
                frame_id: e.id,
                type: AnimeStillsType[toCDN[i].type],
                priority: toCDN[i].priority,
            })) ?? [],
        );

        const fromLink = toLink.map((e) => ({
            anime_id: input.anime_id,
            type: AnimeStillsType[e.type],
            url: e.url,
            priority: e.priority,
        }));

        const stills = await this.prisma.animeStills.createMany({
            data: [...fromCDN, ...fromLink],
        });

        return {
            count: stills.count,
            success: true,
        };
    }

    async updateAnimeStills(
        input: UpdateAnimeStillsInputType,
        user_id: string,
    ): Promise<UpdateAnimeStillsResultsType> {
        const stillsToUpdate = [];

        for (let i = 0; i < input.stills.length; i++) {
            const upd = this.prisma.animeStills.update({
                where: { id: input.stills[i].id },
                data: { ...input.stills[i] },
            });
            stillsToUpdate.push(upd);
        }
        const updatedStills = await Promise.all(stillsToUpdate);

        return { success: true, stills: updatedStills as any };
    }

    async deleteAnimeStills(
        input: DeleteAnimeStillsInputType,
        user_id: string,
    ): Promise<DeleteAnimeStillsResultsType> {
        const stills = await this.prisma.animeStills.findMany({
            where: {
                id: {
                    in: input.id_list,
                },
            },
        });
        const withoutCDN = stills.filter((e) => !e.frame_id);
        const withCDN = stills.filter((e) => e.frame_id);

        await this.stillsFiles.tryDelete(withCDN.map((e) => e.frame_id) as any);
        await this.prisma.animeStills.deleteMany({
            where: {
                id: {
                    in: withoutCDN.map((e) => e.id),
                },
            },
        });

        return { success: true };
    }
}
