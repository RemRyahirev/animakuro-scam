import { CreateUserCatalogInputType } from '../models/inputs/create-user-catalog-input.type';
import { UpdateUserCatalogInputType } from '../models/inputs/update-user-catalog-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetUserCatalogResultsType } from '../models/results/get-user-catalog-results.type';
import { GetListUserCatalogResultsType } from '../models/results/get-list-user-catalog-results.type';
import { CreateUserCatalogResultsType } from '../models/results/create-user-catalog-results.type';
import { UpdateUserCatalogResultsType } from '../models/results/update-user-catalog-results.type';
import { DeleteUserCatalogResultsType } from '../models/results/delete-user-catalog-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';
import { entityUpdateUtil } from '../../../common/utils/entity-update.util';

@Injectable()
export class UserCatalogService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getUserCatalog(id: string): Promise<GetUserCatalogResultsType> {
        const userCatalog = await this.prisma.userFolder.findMany({
            where: {
                id,
                is_catalog: true,
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
            userCatalog: userCatalog[0] as any,
        };
    }

    async getUserCatalogList(
        args: PaginationInputType,
    ): Promise<GetListUserCatalogResultsType> {
        const userCatalogList = await this.prisma.userFolder.findMany({
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
            where: {
                is_catalog: true,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'userFolder',
            args,
        );
        return {
            success: true,
            errors: [],
            userCatalogList: userCatalogList as any,
            pagination,
        };
    }

    async createUserCatalog(
        args: CreateUserCatalogInputType,
    ): Promise<CreateUserCatalogResultsType> {
        const userCatalog = await this.prisma.userFolder.create({
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
                is_catalog: true,
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
            userCatalog: userCatalog as any,
        };
    }

    async updateUserCatalog(
        args: UpdateUserCatalogInputType,
    ): Promise<UpdateUserCatalogResultsType> {
        const userCatalog = await this.prisma.userFolder.update({
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
            userCatalog: userCatalog as any,
        };
    }

    async deleteUserCatalog(id: string): Promise<DeleteUserCatalogResultsType> {
        const userCatalog = await this.prisma.userFolder.delete({
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
            userCatalog: userCatalog as any,
        };
    }
}
