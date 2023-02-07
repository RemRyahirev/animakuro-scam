import { CreateUserFolderInputType } from '../models/inputs/create-user-folder-input.type';
import { UpdateUserFolderInputType } from '../models/inputs/update-user-folder-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetUserFolderResultsType } from '../models/results/get-user-folder-results.type';
import { GetListUserFolderResultsType } from '../models/results/get-list-user-folder-results.type';
import { CreateUserFolderResultsType } from '../models/results/create-user-folder-results.type';
import { UpdateUserFolderResultsType } from '../models/results/update-user-folder-results.type';
import { DeleteUserFolderResultsType } from '../models/results/delete-user-folder-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';
import { entityUpdateUtil } from '../../../common/utils/entity-update.util';
import { GetUserFolderByUserIdResultsType } from '../models/results/get-user-folder-by-user-id-results.type';

@Injectable()
export class UserFolderService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getUserFolderByUserId(
        id: string,
    ): Promise<GetUserFolderByUserIdResultsType> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                user_folders: true,
            },
        });
        const userFolders = user?.user_folders;
        return {
            success: true,
            errors: [],
            userFolderList: userFolders as any,
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
        console.log(userFolder);
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
    ): Promise<CreateUserFolderResultsType> {
        const userFolder = await this.prisma.userFolder.create({
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
                user_collection_id: args.user_id,
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

    async updateUserFolder(
        args: UpdateUserFolderInputType,
    ): Promise<UpdateUserFolderResultsType> {
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
        return {
            success: true,
            errors: [],
            userFolder: userFolder as any,
        };
    }

    async deleteUserFolder(id: string): Promise<DeleteUserFolderResultsType> {
        const userFolder = await this.prisma.userFolder.delete({
            where: { id },
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
}
