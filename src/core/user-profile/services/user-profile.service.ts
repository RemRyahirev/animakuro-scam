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
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';
import { entityUpdateUtil } from '../../../common/utils/entity-update.util';
import { notificationsDefault } from '../../profile-settings/models/inputs/defaults/notifications.default';
import { FileUploadService } from 'common/services/file-upload.service';

@Injectable()
export class UserProfileService {
    bannerFiles;
    coverFiles;

    constructor(
        private prisma: PrismaService,
        private fileUpload: FileUploadService,
        private paginationService: PaginationService,
    ) {
        this.bannerFiles = this.fileUpload.getStorageForOne('userProfile', 'banner_id', 'banner');
        this.coverFiles = this.fileUpload.getStorageForOne('userProfile', 'cover_id', 'cover');
    }

    async getUserProfile(
        id: string,
        token: string,
    ): Promise<GetUserProfileResultsType> {
        if (token == id) {
            const userProfile = await this.prisma.userProfile.findUnique({
                where: {
                    id,
                },
                include: {
                    user: true,
                    profile_settings: true,
                },
            });

            return {
                success: true,
                errors: [],
                userProfile: userProfile as any,
            };
        }
        const userProfile = await this.prisma.userProfile.findUnique({
            where: {
                id,
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
        if (userProfile?.profile_settings?.profile_type == 'PRIVATE') {
            return {
                success: true,
                errors: [
                    {
                        property: 'userProfile',
                        value: null,
                        reason: 'Профиль скрыт',
                    },
                ],
                userProfile: null,
            };
        }
        return {
            success: true,
            errors: [],
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
                banner: await this.bannerFiles.tryCreate(args.banner, authUserId),
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
        console.log(userProfile);

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
                ...args as any,
                banner: await this.bannerFiles.tryUpdate({ id: args.id }, args.banner, undefined, authUserId),
                cover: await this.coverFiles.tryUpdate({ id: args.id }, args.cover, undefined, authUserId),
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
