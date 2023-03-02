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
    }: {
        id: string;
        user_id: string;
        username: string;
    }): Promise<GetUserProfileResultsType> {
        if (!id && !user_id && !username) {
            throw new Error('UNAUTHORIZED');
        }
        const select = {
            user_folders: true,
            user_collection: true,
        };
        const userProfile = await this.prisma.userProfile.findFirst({
            where:
                (!!id && id !== user_id) || !!username
                    ? {
                          AND: [
                              {
                                  user: {
                                      OR: [
                                          { id: id ?? user_id },
                                          { username },
                                      ],
                                  },
                              },
                              {
                                  profile_type: 'PUBLIC',
                              },
                          ],
                      }
                    : user_id
                    ? {
                          user: {
                              id: user_id,
                          },
                      }
                    : undefined,
            include: {
                // profile_settings:
                //     (!!user_id && !id && !username) || id === user_id
                //         ? true
                //         : false,
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
                reason: 'The user has been not found or his profile is closed!',
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
            success: true,
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

        const oldFavoriteAnimeIds = oldFavoriteAnime?.favourite_animes.map(el => el.id) ?? [];
        animeToAdd.forEach(animeId => {
            if (oldFavoriteAnimeIds.includes(animeId)) {
                // already exists
                return;
            }

            this.statistics.fireEvent('animeInFavorites', {
                animeId,
                profileId: profile_id,
            }, 1);
        });
        animeToRemove.forEach(animeId => {
            if (!oldFavoriteAnimeIds.includes(animeId)) {
                // never exists
                return;
            }

            this.statistics.fireEvent('animeInFavorites', {
                animeId,
                profileId: profile_id,
            }, -1);
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
            userFavouriteCharacters: userFavouriteCharacters.favourite_characters as any,
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
}
