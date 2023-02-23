import { Injectable } from '@nestjs/common';

import { FolderType } from '@app/common/models/enums';
import { PaginationInputType } from '@app/common/models/inputs';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { StatisticService } from '@app/common/services/statistic.service';
import { entityUpdateUtil } from '@app/common/utils/entity-update.util';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { CreateUserFolderInputType } from '../models/inputs/create-user-folder-input.type';
import { UpdateUserFolderInputType } from '../models/inputs/update-user-folder-input.type';
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
                user_folders: true,
            },
        });
        return {
            success: true,
            errors: [],
            userFolderList: userByFolders?.user_folders as any,
        };
    }

    async getUserFolder(id: string): Promise<GetUserFolderResultsType> {
        const userFolder = await this.prisma.userFolder.findUnique({
            where: {
                id,
            },
            include: {
                user: {
                    include: {
                        user_profile: {
                            include: {
                                profile_settings: true,
                            },
                        },
                        auth: true,
                        favourite_animes: true,
                        favourite_authors: true,
                        favourite_genres: true,
                        favourite_characters: true,
                        favourite_studios: true,
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
        args: PaginationInputType,
    ): Promise<GetListUserFolderResultsType> {
        const userFolderList = await this.prisma.userFolder.findMany({
            ...transformPaginationUtil(args),
            include: {
                user: {
                    include: {
                        user_profile: {
                            include: {
                                profile_settings: true,
                            },
                        },
                        auth: true,
                        favourite_animes: true,
                        favourite_authors: true,
                        favourite_genres: true,
                        favourite_characters: true,
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
        args: CreateUserFolderInputType,
        user_id: string,
    ): Promise<CreateUserFolderResultsType> {
        const animeToAdd = (args.animes_add ?? []).slice();

        const userFolder = await this.prisma.userFolder.create({
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
                user_id,
                user_collection_id: user_id,
            },
            include: {
                user: {
                    include: {
                        user_profile: {
                            include: {
                                profile_settings: true,
                            },
                        },
                        auth: true,
                        favourite_animes: true,
                        favourite_authors: true,
                        favourite_genres: true,
                        favourite_characters: true,
                        favourite_studios: true,
                    },
                },
                animes: true,
            },
        });

        animeToAdd.forEach(animeId => {
            this.statistics.fireEvent('animeInFolder', {
                animeId,
                userId: user_id,
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
        args: UpdateUserFolderInputType,
        user_id: string,
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
                user: {
                    include: {
                        user_profile: {
                            include: {
                                profile_settings: true,
                            },
                        },
                        auth: true,
                        favourite_animes: true,
                        favourite_authors: true,
                        favourite_genres: true,
                        favourite_characters: true,
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
                userId: user_id,
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
                userId: user_id,
                folderId: userFolder.id,
                folderType: userFolder.type,
            }, -1);
        });

        if (
            oldUserFolder?.is_statistic_active &&
            oldUserFolder.is_statistic_active !== userFolder.is_statistic_active
        ) {
            this.statistics.fireEvent('statFolder', {
                userId: user_id,
                folderId: userFolder.id,
                folderType: userFolder.type,
                isStatisticActive: oldUserFolder.is_statistic_active,
            }, -1);
            this.statistics.fireEvent('statFolder', {
                userId: user_id,
                folderId: userFolder.id,
                folderType: userFolder.type,
                isStatisticActive: userFolder.is_statistic_active,
            }, 1);
        }

        return {
            success: true,
            errors: [],
            userFolder: userFolder as any,
        };
    }

    async deleteUserFolder(
        id: string,
        user_id: string,
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
                userId: user_id,
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
