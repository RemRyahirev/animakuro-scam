import { Injectable } from '@nestjs/common';

import { PaginationInputType } from '@app/common/models/inputs';
import { FileUploadService } from '@app/common/services/file-upload.service';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { StatisticService } from '@app/common/services/statistic.service';
import { entityUpdateUtil } from '@app/common/utils/entity-update.util';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import {
    UpdateUserProfileInputType,
    CreateUserProfileInputType,
    UpdateUserFavouriteAnimeInputType,
    UpdateUserFavouriteStudiosInputType,
    UpdateUserFavouriteAuthorsInputType,
    UpdateUserFavouriteGenresInputType,
    UpdateUserFavouriteCharactersInputType,
    GetUserProfileInputType,
    UpdateUserFavouriteCollectionsInputType,
} from '../models/inputs';
import {
    GetListUserProfileResultsType,
    CreateUserProfileResultsType,
    UpdateUserProfileResultsType,
    DeleteUserProfileResultsType,
    GetUserProfileResultsType,
    UpdateUserFavouriteAnimesResultType,
    UpdateUserFavouriteAuthorsResultType,
    UpdateUserFavouriteCharactersResultType,
    UpdateUserFavouriteGenresResultType,
    UpdateUserFavouriteStudiosResultType,
    UpdateUserFavouriteCollectionsResultType,
} from '../models/results';
import { GetHistoryBaseInputType } from '../models/inputs/get-history-base-input.type';
import { AddHistoryAnimeInputType } from '../models/inputs/add-history-anime-input.type';
import { GetHistoryAnimeResultsType } from '../models/results/get-history-anime-results.type';
import { AddHistoryAnimeResultsType } from '../models/results/add-history-anime-results.type';
import { GetHistoryAuthorResultsType } from '../models/results/get-history-author-results.type';
import { GetHistoryCharacterResultsType } from '../models/results/get-history-character-results.type';
import { AddHistoryAuthorInputType } from '../models/inputs/add-history-author-input.type';
import { AddHistoryAuthorResultsType } from '../models/results/add-history-author-results.type';
import { AddHistoryCharacterInputType } from '../models/inputs/add-history-character-input.type';
import { AddHistoryCharacterResultsType } from '../models/results/add-history-character-results.type';
import { UserCollection } from '../../user-collection/models/user-collection.model';
import { SortOrder } from '@app/common/models/enums/sort-order.enum';

@Injectable()
export class UserProfileService {
    // avatarFiles;
    bannerFiles;
    coverFiles;

    constructor(
        private prisma: PrismaService,
        private fileUpload: FileUploadService,
        private paginationService: PaginationService,
        private statistics: StatisticService,
    ) {
        // this.avatarFiles = this.fileUpload.getStorageForOne(
        //     'userProfile',
        //     'avatar_id',
        //     'userAvatars',
        // );
        this.bannerFiles = this.fileUpload.getStorageForOne(
            'userProfile',
            'banner_id',
            'userBanners',
        );
        this.coverFiles = this.fileUpload.getStorageForOne(
            'userProfile',
            'cover_id',
            'userCovers',
        );
    }

    async getUserProfile({
        id,
        user_id,
        username,
    }: GetUserProfileInputType & {
        user_id: string;
    }): Promise<GetUserProfileResultsType> {
        if (!id && !user_id && !username) {
            throw new Error('UNAUTHORIZED');
        }
        const select = {
            user_folders: true,
            user_collection: true,
            favourite_animes: true,
            favourite_authors: true,
            favourite_characters: true,
            favourite_collections: true,
            favourite_genres: true,
            favourite_studios: true,
        };
        const userProfile = await this.prisma.userProfile.findFirst({
            where:
                (!!id && id !== user_id) || !!username
                    ? {
                          AND: [
                              {
                                  user: {
                                      OR: [{ id: id ?? user_id }, { username }],
                                  },
                              },
                              {
                                  profile_type: 'PUBLIC',
                              },
                          ],
                      }
                    : user_id
                    ? {
                          user_id,
                      }
                    : undefined,
            include: {
                user:
                    (id && id != user_id) || username
                        ? {
                              select: {
                                  is_email_confirmed: false,
                                  id: true,
                                  username: true,
                                  avatar: true,
                              },
                          }
                        : {},
                ...select,
            },
        });
        const errors = [];
        if (!userProfile) {
            errors.push({
                property: 'userProfileQueries.getUserProfile',
                reason: 'ACCES_DENIDED_PROFILE_PRIVATE',
                value: 401,
            });
        }

        if (user_id !== id && userProfile) {
            this.statistics.fireEvent(
                'getProfile',
                {
                    profileId: userProfile.id,
                },
                1,
            );
        }

        return {
            success: errors.length > 0 ? false : true,
            errors: errors,
            userProfile: userProfile as any,
        };
    }

    async getUserProfileList(
        args: PaginationInputType,
    ): Promise<GetListUserProfileResultsType> {
        const userProfileList = await this.prisma.userProfile.findMany({
            where: {
                profile_type: 'PUBLIC',
            },
            ...transformPaginationUtil(args),
            include: {
                user: true,
                avatar: {
                    include: {
                        user: true,
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

                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_collections: true,
                favourite_genres: true,
                favourite_studios: true,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'userProfile',
            args,
        );

        return {
            success: true,
            errors: [],
            userProfileList: userProfileList as any,
            pagination,
        };
    }

    async getHistoryCharacter(
        args: GetHistoryBaseInputType,
        pagination: PaginationInputType,
    ): Promise<GetHistoryCharacterResultsType> {
        const character_history_list =
            await this.prisma.characterHistory.findMany({
                where: {
                    spent_time: {
                        gte: args.min_spent_time,
                        lte: args.max_spent_time,
                    },
                },
                orderBy: {
                    [args.sort_field]: args.sort_order,
                },
                ...transformPaginationUtil(pagination),
                include: {
                    character: true,
                    user_profile: true,
                },
            });
        return {
            success: true,
            character_history_list: character_history_list as any,
        };
    }

    async addHistoryCharacter(
        args: AddHistoryCharacterInputType,
        user_profile_id: string,
    ): Promise<AddHistoryCharacterResultsType> {
        const exists_history = await this.prisma.characterHistory.findFirst({
            where: {
                user_profile_id,
                character_id: args.character_id,
            },
        });

        if (exists_history) {
            await this.prisma.characterHistory.update({
                where: { id: exists_history.id },
                data: {
                    spent_time: exists_history.spent_time + args.spent_time,
                },
            });
        } else {
            await this.prisma.characterHistory.create({
                data: {
                    character_id: args.character_id,
                    spent_time: args.spent_time,
                    user_profile_id,
                },
            });
        }

        const character_history = await this.prisma.characterHistory.findFirst({
            where: {
                user_profile_id,
                character_id: args.character_id,
            },
            include: {
                character: true,
                user_profile: true,
            },
        });
        return { success: true, character_history: character_history as any };
    }

    async getHistoryAuthor(
        args: GetHistoryBaseInputType,
        pagination: PaginationInputType,
    ): Promise<GetHistoryAuthorResultsType> {
        const author_history_list = await this.prisma.authorHistory.findMany({
            where: {
                spent_time: {
                    gte: args.min_spent_time,
                    lte: args.max_spent_time,
                },
            },
            orderBy: {
                [args.sort_field]: args.sort_order,
            },
            ...transformPaginationUtil(pagination),
            include: {
                author: true,
                user_profile: true,
            },
        });
        return {
            success: true,
            author_history_list: author_history_list as any,
        };
    }

    async addHistoryAuthor(
        args: AddHistoryAuthorInputType,
        user_profile_id: string,
    ): Promise<AddHistoryAuthorResultsType> {
        const exists_history = await this.prisma.authorHistory.findFirst({
            where: {
                user_profile_id,
                author_id: args.author_id,
            },
        });

        if (exists_history) {
            await this.prisma.authorHistory.update({
                where: { id: exists_history.id },
                data: {
                    spent_time: exists_history.spent_time + args.spent_time,
                },
            });
        } else {
            await this.prisma.authorHistory.create({
                data: {
                    author_id: args.author_id,
                    spent_time: args.spent_time,
                    user_profile_id,
                },
            });
        }

        const author_history = await this.prisma.authorHistory.findFirst({
            where: {
                user_profile_id,
                author_id: args.author_id,
            },
            include: {
                author: true,
                user_profile: true,
            },
        });

        return { success: true, author_history: author_history as any };
    }

    async getHistoryAnime(
        args: GetHistoryBaseInputType,
        pagination: PaginationInputType,
    ): Promise<GetHistoryAnimeResultsType> {
        const anime_history_list = await this.prisma.animeHistory.findMany({
            where: {
                spent_time: {
                    gte: args.min_spent_time,
                    lte: args.max_spent_time,
                },
            },
            orderBy: {
                [args.sort_field]: args.sort_order,
            },
            ...transformPaginationUtil(pagination),
            include: {
                anime: true,
                user_profile: true,
            },
        });

        return { success: true, anime_history_list: anime_history_list };
    }

    async addHistoryAnime(
        args: AddHistoryAnimeInputType,
        user_profile_id: string,
    ): Promise<AddHistoryAnimeResultsType> {
        const exists_history = await this.prisma.animeHistory.findFirst({
            where: {
                user_profile_id,
                anime_id: args.anime_id,
            },
        });
        if (exists_history) {
            await this.prisma.animeHistory.update({
                where: { id: exists_history.id },
                data: {
                    spent_time: exists_history.spent_time + args.spent_time,
                },
            });
        } else {
            await this.prisma.animeHistory.create({
                data: {
                    anime_id: args.anime_id,
                    spent_time: args.spent_time,
                    user_profile_id,
                },
            });
        }

        const anime_history = await this.prisma.animeHistory.findFirst({
            where: {
                user_profile_id,
                anime_id: args.anime_id,
            },
            include: {
                anime: true,
                user_profile: true,
            },
        });

        return { success: true, anime_history: anime_history as any };
    }

    async createUserProfile(
        args: CreateUserProfileInputType,
        authUserId: string,
    ): Promise<CreateUserProfileResultsType> {
        const { user_id, avatar, ...other } = args;
        const userProfile = await this.prisma.userProfile.create({
            data: {
                ...(other as any),
                integrations: [],
                user: {
                    connect: {
                        id: user_id,
                    },
                },
                // avatar: await this.avatarFiles.tryCreate(
                //     args.avatar,
                //     authUserId,
                // ),
                banner: await this.bannerFiles.tryCreate(
                    args.banner,
                    authUserId,
                ),
                cover: await this.coverFiles.tryCreate(args.cover, authUserId),
            },
            include: {
                user: true,
                avatar: {
                    include: {
                        user: true,
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
            },
        });

        return {
            success: true,
            errors: [],
            userProfile: userProfile as any,
        };
    }

    async updateUserProfile(
        args: UpdateUserProfileInputType,
        authUserId: string,
    ): Promise<UpdateUserProfileResultsType> {
        const userProfile = await this.prisma.userProfile.update({
            where: { id: args.id },
            data: {
                ...(args as any),
                // avatar: await this.avatarFiles.tryUpdate(
                //     { id: args.id },
                //     args.avatar,
                //     undefined,
                //     authUserId,
                // ),
                banner: await this.bannerFiles.tryUpdate(
                    { id: args.id },
                    args.banner,
                    undefined,
                    authUserId,
                ),
                cover: await this.coverFiles.tryUpdate(
                    { id: args.id },
                    args.cover,
                    undefined,
                    authUserId,
                ),
            },
            include: {
                user: true,
                avatar: {
                    include: {
                        user: true,
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
            },
        });
        return {
            success: true,
            errors: [],
            userProfile: userProfile as any,
        };
    }

    async deleteUserProfile(id: string): Promise<DeleteUserProfileResultsType> {
        await Promise.all([
            // this.avatarFiles.tryDeleteAll({ id }),
            this.bannerFiles.tryDeleteAll({ id }),
            this.coverFiles.tryDeleteAll({ id }),
        ]);
        const userProfile = await this.prisma.userProfile.delete({
            where: { id },
            include: {
                avatar: {
                    include: {
                        user: true,
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
            },
        });

        return {
            success: true,
            errors: [],
            userProfile: userProfile as any,
        };
    }

    async updateFavouriteAnimes(
        args: UpdateUserFavouriteAnimeInputType,
        profile_id: string,
    ): Promise<UpdateUserFavouriteAnimesResultType> {
        const animeToAdd = (args.favourite_animes_add ?? []).slice();
        const animeToRemove = (args.favourite_animes_remove ?? []).slice();
        const oldFavoriteAnime = await this.prisma.userProfile.findUnique({
            where: {
                id: profile_id,
            },
            select: {
                favourite_animes: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const userFavouriteAnimes = await this.prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: {
                ...entityUpdateUtil('favourite_animes', args),
            },
            include: {
                favourite_animes: true,
            },
        });

        const oldFavoriteAnimeIds =
            oldFavoriteAnime?.favourite_animes.map((el) => el.id) ?? [];
        animeToAdd.forEach((animeId) => {
            if (oldFavoriteAnimeIds.includes(animeId)) {
                // already exists
                return;
            }

            this.statistics.fireEvent(
                'animeInFavorites',
                {
                    animeId,
                    profileId: profile_id,
                },
                1,
            );
        });
        animeToRemove.forEach((animeId) => {
            if (!oldFavoriteAnimeIds.includes(animeId)) {
                // never exists
                return;
            }

            this.statistics.fireEvent(
                'animeInFavorites',
                {
                    animeId,
                    profileId: profile_id,
                },
                -1,
            );
        });

        return {
            success: true,
            errors: [],
            userFavouriteAnimes: userFavouriteAnimes.favourite_animes as any,
        };
    }

    async updateFavouriteStudios(
        args: UpdateUserFavouriteStudiosInputType,
        profile_id: string,
    ): Promise<UpdateUserFavouriteStudiosResultType> {
        const userFavouriteStudios = await this.prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: {
                ...entityUpdateUtil('favourite_studios', args),
            },
            include: {
                favourite_studios: true,
            },
        });
        return {
            success: true,
            errors: [],
            userFavouriteStudios: userFavouriteStudios.favourite_studios as any,
        };
    }

    async updateFavouriteCharacters(
        args: UpdateUserFavouriteCharactersInputType,
        profile_id: string,
    ): Promise<UpdateUserFavouriteCharactersResultType> {
        const userFavouriteCharacters = await this.prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: {
                ...entityUpdateUtil('favourite_characters', args),
            },
            include: {
                favourite_characters: true,
            },
        });
        return {
            success: true,
            errors: [],
            userFavouriteCharacters:
                userFavouriteCharacters.favourite_characters as any,
        };
    }

    async updateFavouriteAuthors(
        args: UpdateUserFavouriteAuthorsInputType,
        profile_id: string,
    ): Promise<UpdateUserFavouriteAuthorsResultType> {
        const userFavouriteAuthors = await this.prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: {
                ...entityUpdateUtil('favourite_authors', args),
            },
            include: {
                favourite_authors: true,
            },
        });
        return {
            success: true,
            errors: [],
            userFavouriteAuthors: userFavouriteAuthors.favourite_authors as any,
        };
    }

    async updateFavouriteGenres(
        args: UpdateUserFavouriteGenresInputType,
        profile_id: string,
    ): Promise<UpdateUserFavouriteGenresResultType> {
        const userFavouriteGenres = await this.prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: {
                ...entityUpdateUtil('favourite_genres', args),
            },
            include: {
                favourite_genres: true,
            },
        });
        return {
            success: true,
            errors: [],
            userFavouriteGenres: userFavouriteGenres.favourite_genres as any,
        };
    }
    async updateFavouriteCollections(
        args: UpdateUserFavouriteCollectionsInputType,
        profile_id: string,
    ): Promise<UpdateUserFavouriteCollectionsResultType> {
        const collectionToAdd = (args.favourite_collections_add ?? []).slice();
        const collectionToRemove = (
            args.favourite_collections_remove ?? []
        ).slice();
        const oldFavoriteCollection = await this.prisma.userProfile.findUnique({
            where: {
                id: profile_id,
            },
            select: {
                favourite_collections: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        const userFavouriteCollections = await this.prisma.userProfile.update({
            where: {
                id: profile_id,
            },
            data: {
                ...entityUpdateUtil('favourite_collections', args),
            },
            select: {
                favourite_collections: true,
            },
        });

        const oldFavoriteCollectionIds =
            oldFavoriteCollection?.favourite_collections.map((el) => el.id) ??
            [];
        collectionToAdd.forEach((collectionId) => {
            if (oldFavoriteCollectionIds.includes(collectionId)) {
                // already exists
                return;
            }

            this.statistics.fireEvent(
                'collectionInFavorites',
                {
                    collectionId,
                    profileId: profile_id,
                },
                1,
            );
        });
        collectionToRemove.forEach((collectionId) => {
            if (!oldFavoriteCollectionIds.includes(collectionId)) {
                // never exists
                return;
            }

            this.statistics.fireEvent(
                'collectionInFavorites',
                {
                    collectionId,
                    profileId: profile_id,
                },
                -1,
            );
        });

        return {
            success: true,
            errors: [],
            userFavouriteCollections:
                userFavouriteCollections.favourite_collections as any,
        };
    }

    async getGenresLikeFolders(
        userId: string,
        name: SortOrder,
        count: SortOrder,
        countIn: SortOrder,
        percent: SortOrder,
    ) {
        const statistic = await this.prisma.userProfile.findUnique({
            where: { user_id: userId },
            select: {
                statistics: true,
            },
        });

        //@ts-ignore
        const genresIds = Object.keys(statistic?.statistics.folder.genre)
        const countSum = Object.values(
            //@ts-ignore
            statistic?.statistics.folder.genre,
        ).reduce((a: any, b: any) => a + b, 0);

        const genres = await this.prisma.genre.findMany({
            where: {
                id: { in: genresIds },
            },
            orderBy: [
                {
                    name,
                },
            ],
            include: {
                animes: true,
            },
        });

        const result: any[] = [];

        genres.map((genre) =>
            result.push({
                genre: {
                    id: genre.id,
                    name: genre.name,
                    description: genre.description,
                },
                //@ts-ignore
                count: statistic?.statistics.folder.genre[genre.id],
                percent:
                    //@ts-ignore
                    Math.round((statistic?.statistics.folder.genre[genre.id] / countSum).toFixed(2) * 100),
                animes: genre.animes,
            }),
        );

        if (name) {
            console.log(result);
        }
        if (count) {
            result.sort(this.byField('count'));

            if (count === 'desc') {
                result.reverse();
            }
        }
        if (countIn) {
            result.sort(this.byField('animes'));
        }
            // console.log(result)

        //@ts-ignore
        const a = statistic?.statistics.folder.genre;

        const sortable = [];
        for (const genre in a) {
            sortable.push([genre, a[genre]]);
        }

        const b = this.getObject(sortable.sort((a, b) => a[1] - b[1]));

        // console.log(b)

        return {
            success: true,
        };
    }

    private getObject = (data: any) =>
        data.reduce((acc: any, obj: any) => {
            acc[obj[0]] = obj[1];
            return acc;
        }, {});

    private byField = (field: any) => {
        return (a: any, b: any) => (a[field] > b[field] ? 1 : -1);
    };
}
