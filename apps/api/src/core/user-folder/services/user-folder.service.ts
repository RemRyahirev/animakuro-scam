import { Injectable } from '@nestjs/common';

import { FolderType } from '@app/common/models/enums';
import { PaginationArgsType } from '@app/common/models/inputs';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { StatisticService } from '@app/common/services/statistic.service';
import { entityUpdateUtil } from '@app/common/utils/entity-update.util';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { CreateUserFolderArgsType } from '../models/inputs/create-user-folder-args.type';
import { UpdateUserFolderArgsType } from '../models/inputs/update-user-folder-args.type';
import { GetUserFolderResultsType } from '../models/results/get-user-folder-results.type';
import { GetListUserFolderResultsType } from '../models/results/get-list-user-folder-results.type';
import { CreateUserFolderResultsType } from '../models/results/create-user-folder-results.type';
import { UpdateUserFolderResultsType } from '../models/results/update-user-folder-results.type';
import { DeleteUserFolderResultsType } from '../models/results/delete-user-folder-results.type';
import { GetUserFolderByUserIdResultsType } from '../models/results/get-user-folder-by-user-id-results.type';

@Injectable()
export class UserFolderService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        private statistics: StatisticService,
    ) {}

    async getUserFolderByUserId(
        id: string,
    ): Promise<GetUserFolderByUserIdResultsType> {
        const userByFolders = await this.prisma.user.findUnique({
            where: { id },
            include: {
                user_profile: {
                    include: {
                        user_folders: true,
                    },
                },
            },
        });
        return {
            success: true,
            errors: [],
            userFolderList: userByFolders?.user_profile?.user_folders as any,
        };
    }

    async getUserFolderByProfileId(
        id: string,
    ): Promise<GetUserFolderByUserIdResultsType> {
        const profileByFolders = await this.prisma.userProfile.findUnique({
            where: { id },
            include: {
                user_folders: true,
            },
        });
        return {
            success: true,
            errors: [],
            userFolderList: profileByFolders?.user_folders as any,
        };
    }

    async getUserFolder(id: string): Promise<GetUserFolderResultsType> {
        const userFolder = await this.prisma.userFolder.findUnique({
            where: {
                id,
            },
            include: {
                user_profile: {
                    include: {
                        user: {
                            include: {
                                auth: true,
                            },
                        },
                        favourite_animes: true,
                        favourite_authors: true,
                        favourite_genres: true,
                        favourite_characters: true,
                        favourite_studios: true,
                        favourite_collections: true,
                    },
                },
                animes: true,
            },
        });
        return {
            success: true,
            errors: [],
            userFolder: userFolder as any,
        };
    }

    async getUserFolderList(
        args: PaginationArgsType,
    ): Promise<GetListUserFolderResultsType> {
        const userFolderList = await this.prisma.userFolder.findMany({
            ...transformPaginationUtil(args),
            include: {
                user_profile: {
                    include: {
                        user: {
                            include: {
                                auth: true,
                            },
                        },
                        favourite_animes: true,
                        favourite_authors: true,
                        favourite_genres: true,
                        favourite_characters: true,
                        favourite_collections: true,
                        favourite_studios: true,
                    },
                },
                animes: true,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'userFolder',
            args,
        );
        return {
            success: true,
            errors: [],
            userFolderList: userFolderList as any,
            pagination,
        };
    }

    async createUserFolder(
        args: CreateUserFolderArgsType,
        user_profile_id: string,
    ): Promise<CreateUserFolderResultsType> {
        const animeToAdd = (args.animes_add ?? []).slice();

        const userFolder = await this.prisma.userFolder.create({
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
                user_profile: {
                    connect: {
                        id: user_profile_id,
                    }
                },
                user_collection: {
                    connect: {
                        id: user_profile_id,
                    },
                },
            },
            include: {
                user_profile: {
                    include: {
                        user: {
                            include: {
                                auth: true,
                            },
                        },
                        favourite_animes: true,
                        favourite_authors: true,
                        favourite_genres: true,
                        favourite_characters: true,
                        favourite_collections: true,
                        favourite_studios: true,
                    },
                },
                animes: true,
            },
        });

        animeToAdd.forEach(animeId => {
            this.statistics.fireEvent('animeInFolder', {
                animeId,
                profileId: user_profile_id,
                folderId: userFolder.id,
                folderType: userFolder.type,
            }, 1);
        });

        return {
            success: true,
            errors: [],
            userFolder: userFolder as any,
        };
    }

    async updateUserFolder(
        args: UpdateUserFolderArgsType,
        user_profile_id: string,
    ): Promise<UpdateUserFolderResultsType> {
        const animeToAdd = (args.animes_add ?? []).slice();
        const animeToRemove = (args.animes_remove ?? []).slice();
        const oldUserFolder = await this.prisma.userFolder.findUnique({
            where: {
                id: args.id,
            },
            select: {
                is_statistic_active: true,
                animes: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const userFolder = await this.prisma.userFolder.update({
            where: { id: args.id },
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
            },
            include: {
                user_profile: {
                    include: {
                        user: {
                            include: {
                                auth: true,
                            },
                        },
                        favourite_animes: true,
                        favourite_authors: true,
                        favourite_genres: true,
                        favourite_characters: true,
                        favourite_collections: true,
                        favourite_studios: true,
                    },
                },
                animes: true,
            },
        });

        const oldFolderAnime = oldUserFolder?.animes.map(el => el.id) ?? [];
        animeToAdd.forEach(animeId => {
            if (oldFolderAnime.includes(animeId)) {
                // already exists
                return;
            }

            this.statistics.fireEvent('animeInFolder', {
                animeId,
                profileId: user_profile_id,
                folderId: userFolder.id,
                folderType: userFolder.type,
            }, 1);
        });
        animeToRemove.forEach(animeId => {
            if (!oldFolderAnime.includes(animeId)) {
                // never exists
                return;
            }

            this.statistics.fireEvent('animeInFolder', {
                animeId,
                profileId: user_profile_id,
                folderId: userFolder.id,
                folderType: userFolder.type,
            }, -1);
        });

        if (oldUserFolder?.is_statistic_active !== userFolder.is_statistic_active) {
            this.statistics.fireEvent('statFolder', {
                profileId: user_profile_id,
                folderId: userFolder.id,
                folderType: userFolder.type,
            }, userFolder.is_statistic_active ? 1 : -1);
        }

        return {
            success: true,
            errors: [],
            userFolder: userFolder as any,
        };
    }

    async deleteUserFolder(
        id: string,
        user_profile_id: string,
    ): Promise<DeleteUserFolderResultsType> {
        const oldUserFolder = await this.prisma.userFolder.findUnique({
            where: { id },
            select: {
                type: true,
                animes: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const userFolder = await this.prisma.userFolder.deleteMany({
            // TODO: why DEFAULT?
            where: { id, type: FolderType.DEFAULT },
        });

        oldUserFolder?.animes.forEach(anime => {
            this.statistics.fireEvent('animeInFolder', {
                animeId: anime.id,
                profileId: user_profile_id,
                folderId: id,
                folderType: oldUserFolder.type,
            }, -1);
        });

        return {
            success: true,
            errors: [],
            userFolder: userFolder as any,
        };
    }
}
