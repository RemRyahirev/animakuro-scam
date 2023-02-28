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
} from '../models/results';
import { notificationsDefault } from '../../profile-settings/models/inputs/defaults/notifications.default';

@Injectable()
export class UserProfileService {
    bannerFiles;
    coverFiles;

    constructor(
        private prisma: PrismaService,
        private fileUpload: FileUploadService,
        private paginationService: PaginationService,
        private statistics: StatisticService,
    ) {
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
        const selectUser = {
            favourite_animes: true,
            favourite_authors: true,
            favourite_characters: true,
            favourite_genres: true,
            favourite_studios: true,
            user_folders: true,
            user_collection: true,
        };
        const userProfile = await this.prisma.userProfile.findFirst({
            where:
                (!!id && id !== user_id) || !!username
                    ? {
                          AND: [
                              {
                                  OR: [{ user_id: id }, { user: { username } }],
                              },
                              {
                                  profile_settings: {
                                      profile_type: 'PUBLIC',
                                  },
                              },
                          ],
                      }
                    : user_id
                    ? {
                          user_id,
                      }
                    : undefined,
            include: {
                profile_settings:
                    (!!user_id && !id && !username) || id === user_id
                        ? true
                        : false,
                user:
                    (id && id != user_id) || username
                        ? {
                              select: {
                                  is_email_confirmed: false,
                                  id: true,
                                  username: true,
                                  avatar: true,
                                  ...selectUser,
                              },
                          }
                        : {
                              include: selectUser,
                          },
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
                profile_settings: {
                    profile_type: 'PUBLIC',
                },
            },
            ...transformPaginationUtil(args),
            include: {
                user: true,
                profile_settings: true,
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

    async createUserProfile(
        args: CreateUserProfileInputType,
        authUserId: string,
    ): Promise<CreateUserProfileResultsType> {
        const { user_id, ...other } = args;
        const userProfile = await this.prisma.userProfile.create({
            data: {
                ...(other as any),
                profile_settings: {
                    create: {
                        integrations: [],
                        notifications: notificationsDefault,
                    },
                },
                user: {
                    connect: {
                        id: user_id,
                    },
                },
                banner: await this.bannerFiles.tryCreate(
                    args.banner,
                    authUserId,
                ),
                cover: await this.coverFiles.tryCreate(args.cover, authUserId),
            },
            include: {
                user: true,
                profile_settings: true,
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
                profile_settings: true,
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
            this.bannerFiles.tryDeleteAll({ id }),
            this.coverFiles.tryDeleteAll({ id }),
        ]);
        const userProfile = await this.prisma.userProfile.delete({
            where: { id },
            include: {
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
        user_id: string,
    ): Promise<UpdateUserFavouriteAnimesResultType> {
        const animeToAdd = (args.favourite_animes_add ?? []).slice();
        const animeToRemove = (args.favourite_animes_remove ?? []).slice();
        const oldFavoriteAnime = await this.prisma.user.findUnique({
            where: {
                id: user_id,
            },
            select: {
                favourite_animes: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const userFavouriteAnimes = await this.prisma.user.update({
            where: {
                id: user_id,
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
                    userId: user_id,
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
                    userId: user_id,
                },
                -1,
            );
        });

        return {
            success: true,
            errors: [],
            userFavouriteAnimes: userFavouriteAnimes['favourite_animes'] as any,
        };
    }

    async updateFavouriteStudios(
        args: UpdateUserFavouriteStudiosInputType,
        user_id: string,
    ): Promise<UpdateUserFavouriteStudiosResultType> {
        const userFavouriteStudios = await this.prisma.user.update({
            where: {
                id: user_id,
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
            userFavouriteStudios: userFavouriteStudios[
                'favourite_studios'
            ] as any,
        };
    }

    async updateFavouriteCharacters(
        args: UpdateUserFavouriteCharactersInputType,
        user_id: string,
    ): Promise<UpdateUserFavouriteCharactersResultType> {
        const userFavouriteCharacters = await this.prisma.user.update({
            where: {
                id: user_id,
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
            userFavouriteCharacters: userFavouriteCharacters[
                'favourite_characters'
            ] as any,
        };
    }

    async updateFavouriteAuthors(
        args: UpdateUserFavouriteAuthorsInputType,
        user_id: string,
    ): Promise<UpdateUserFavouriteAuthorsResultType> {
        const userFavouriteAuthors = await this.prisma.user.update({
            where: {
                id: user_id,
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
            userFavouriteAuthors: userFavouriteAuthors[
                'favourite_authors'
            ] as any,
        };
    }

    async updateFavouriteGenres(
        args: UpdateUserFavouriteGenresInputType,
        user_id: string,
    ): Promise<UpdateUserFavouriteGenresResultType> {
        const userFavouriteGenres = await this.prisma.user.update({
            where: {
                id: user_id,
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
            userFavouriteGenres: userFavouriteGenres['favourite_genres'] as any,
        };
    }
}
