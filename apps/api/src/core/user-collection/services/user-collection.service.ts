import { Injectable } from '@nestjs/common';

import { PaginationInputType } from '@app/common/models/inputs';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { entityUpdateUtil } from '@app/common/utils/entity-update.util';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { CreateUserCollectionInputType } from '../models/inputs/create-user-collection-input.type';
import { UpdateUserCollectionInputType } from '../models/inputs/update-user-collection-input.type';
import { GetUserCollectionResultsType } from '../models/results/get-user-collection-results.type';
import { GetListUserCollectionResultsType } from '../models/results/get-list-user-collection-results.type';
import { CreateUserCollectionResultsType } from '../models/results/create-user-collection-results.type';
import { UpdateUserCollectionResultsType } from '../models/results/update-user-collection-results.type';
import { DeleteUserCollectionResultsType } from '../models/results/delete-user-collection-results.type';

@Injectable()
export class UserCollectionService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) { }

    async getUserCollection(id: string): Promise<GetUserCollectionResultsType> {
        const userCollection = await this.prisma.userFolder.findMany({
            where: {
                id,
                is_collection: true,
            },
            include: {
                user: {
                    include: {
                        user_profile: {
                            include: {
                                profile_settings: true,
                            },
                        },
                        user_folders: {
                            include: {
                                animes: true,
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
            userCollection: userCollection[0] as any,
        };
    }

    async getUserCollectionListByUserId(
        user_id: string,
        args: PaginationInputType,
    ): Promise<GetListUserCollectionResultsType> {
        const userCollectionList = await this.prisma.userFolder.findMany({
            ...transformPaginationUtil(args),
            include: {
                user: {
                    include: {
                        user_profile: {
                            include: {
                                profile_settings: true,
                            },
                        },
                        user_folders: {
                            include: {
                                animes: true,
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
            where: {
                is_collection: true,
                user_id,
            },
        });

        const pagination = await this.paginationService.getPagination(
            'userFolder',
            args,
        );
        return {
            success: true,
            errors: [],
            userCollectionList: userCollectionList as any,
            pagination,
        };
    }

    async getUserCollectionList(
        args: PaginationInputType,
    ): Promise<GetListUserCollectionResultsType> {
        const userCollectionList = await this.prisma.userFolder.findMany({
            ...transformPaginationUtil(args),
            include: {
                user: {
                    include: {
                        user_profile: {
                            include: {
                                profile_settings: true,
                            },
                        },
                        user_folders: {
                            include: {
                                animes: true,
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
            where: {
                is_collection: true,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'userFolder',
            args,
        );
        return {
            success: true,
            errors: [],
            userCollectionList: userCollectionList as any,
            pagination,
        };
    }

    async createUserCollection(
        args: CreateUserCollectionInputType,
        user_id: string,
    ): Promise<CreateUserCollectionResultsType> {
        const userCollection = await this.prisma.userFolder.create({
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
                is_collection: true,
                user_id,
            },
            include: {
                user: {
                    include: {
                        user_profile: {
                            include: {
                                profile_settings: true,
                            },
                        },
                        user_folders: {
                            include: {
                                animes: true,
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
            userCollection: userCollection as any,
        };
    }

    async updateUserCollection(
        args: UpdateUserCollectionInputType,
    ): Promise<UpdateUserCollectionResultsType> {
        const userCollection = await this.prisma.userFolder.update({
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
                        user_folders: {
                            include: {
                                animes: true,
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
            userCollection: userCollection as any,
        };
    }

    async deleteUserCollection(
        id: string,
    ): Promise<DeleteUserCollectionResultsType> {
        const userCollection = await this.prisma.userFolder.delete({
            where: { id },
            include: {
                user: {
                    include: {
                        user_profile: {
                            include: {
                                profile_settings: true,
                            },
                        },
                        user_folders: {
                            include: {
                                animes: true,
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
            userCollection: userCollection as any,
        };
    }
}
