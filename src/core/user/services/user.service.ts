import { Injectable } from '@nestjs/common';
import { CreateUserInputType } from '../models/inputs/create-user-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { UpdateUserInputType } from '../models/inputs/update-user-input.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { CreateUserResultsType } from '../models/results/create-user-results.type';
import { UpdateUserResultsType } from '../models/results/update-user-results.type';
import { GetListUserResultsType } from '../models/results/get-list-user-results.type';
import { GetUserResultsType } from '../models/results/get-user-results.type';
import { mediaConnectUtil } from '../utils/media-connect.util';
import { UpdateUserFavouritesInputType } from '../models/inputs/update-user-favourites-input.type';
import { userDefaults } from '../../../common/defaults/user-defaults';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        private jwtService: JwtService,
    ) {}

    async getUserList(
        args: PaginationInputType,
    ): Promise<GetListUserResultsType> {
        const userList: any = await this.prisma.user.findMany({
            ...transformPaginationUtil(args),
            include: {
                auth: true,
                user_profile: {
                    include: {
                        profile_settings: true,
                    },
                },
                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_genres: true,
                favourite_studios: true,
                user_folders: {
                    include: {
                        animes: true,
                    },
                },
                user_collection: {
                    where: {
                        is_collection: true,
                    },
                    include: {
                        animes: true,
                    },
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'user',
            args,
        );
        return {
            success: true,
            errors: [],
            userList: userList as any,
            pagination,
        };
    }

    async getUser(token: string): Promise<GetUserResultsType> {
        const decoded = this.jwtService.decode(token);
        if (decoded == null || typeof decoded == 'string') {
            return {
                success: false,
                user: null,
            };
        }
        const user = this.prisma.user.findUnique({
            where: {
                id: decoded.uuid,
            },
        });
        return {
            success: true,
            user: user as any,
        };
    }

    async updateUserFavourites(
        args: UpdateUserFavouritesInputType,
    ): Promise<UpdateUserResultsType> {
        const user = await this.prisma.user.update({
            where: { id: args.id },
            data: {
                ...mediaConnectUtil(args),
            },
            include: {
                auth: true,
                user_profile: {
                    include: {
                        profile_settings: true,
                    },
                },
                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_genres: true,
                favourite_studios: true,
                user_folders: {
                    include: {
                        animes: true,
                    },
                },
                user_collection: {
                    where: {
                        is_collection: true,
                    },
                    include: {
                        animes: true,
                    },
                },
            },
        });

        return {
            success: true,
            errors: [],
            user: user as any,
        };
    }

    async getUsersByEmail(
        email: string,
        args: PaginationInputType,
    ): Promise<GetListUserResultsType> {
        const userList = await this.prisma.user.findMany({
            where: { email },
            ...transformPaginationUtil(args),
            include: {
                auth: true,
                user_profile: {
                    include: {
                        profile_settings: true,
                    },
                },
                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_genres: true,
                favourite_studios: true,
                user_folders: {
                    include: {
                        animes: true,
                    },
                },
                user_collection: {
                    where: {
                        is_collection: true,
                    },
                    include: {
                        animes: true,
                    },
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'user',
            args,
        );
        return {
            success: true,
            userList: userList as any,
            pagination,
        };
    }

    async findOneById(id: string): Promise<GetUserResultsType> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                user_profile: {
                    include: {
                        profile_settings: true,
                    },
                },
                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_genres: true,
                favourite_studios: true,
                user_folders: {
                    include: {
                        animes: true,
                    },
                },
                user_collection: {
                    where: {
                        is_collection: true,
                    },
                    include: {
                        animes: true,
                    },
                },
            },
        });
        return {
            errors: [],
            success: true,
            user: user as any,
        };
    }

    async findUserByEmailOrUsername(
        email: string,
        username: string | undefined,
    ) {
        return await this.prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
            include: {
                auth: true,
                user_profile: {
                    include: {
                        profile_settings: true,
                    },
                },
                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_genres: true,
                favourite_studios: true,
                user_folders: {
                    include: {
                        animes: true,
                    },
                },
                user_collection: {
                    where: {
                        is_collection: true,
                    },
                    include: {
                        animes: true,
                    },
                },
            },
        });
    }

    async findUserByUsername(username: string) {
        return await this.prisma.user.findFirst({
            where: {
                username,
            },
            include: {
                auth: true,
                user_profile: {
                    include: {
                        profile_settings: true,
                    },
                },
                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_genres: true,
                favourite_studios: true,
                user_folders: {
                    include: {
                        animes: true,
                    },
                },
                user_collection: {
                    where: {
                        is_collection: true,
                    },
                    include: {
                        animes: true,
                    },
                },
            },
        });
    }

    async createUser(
        args: CreateUserInputType,
    ): Promise<CreateUserResultsType> {
        const user = await this.prisma.user.create({
            data: {
                ...args,
                ...userDefaults,
                is_social: false,
                is_email_confirmed: false,
            },
            include: {
                auth: true,
                user_profile: {
                    include: {
                        profile_settings: true,
                    },
                },
                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_genres: true,
                favourite_studios: true,
                user_folders: {
                    include: {
                        animes: true,
                    },
                },
                user_collection: {
                    where: {
                        is_collection: true,
                    },
                    include: {
                        animes: true,
                    },
                },
            },
        });
        return {
            success: true,
            user: user as any,
        };
    }

    async updateUser(
        args: UpdateUserInputType,
    ): Promise<UpdateUserResultsType> {
        const user = await this.prisma.user.update({
            where: { id: args.id },
            data: args as any,
            include: {
                auth: true,
                user_profile: {
                    include: {
                        profile_settings: true,
                    },
                },
                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_genres: true,
                favourite_studios: true,
                user_folders: {
                    include: {
                        animes: true,
                    },
                },
                user_collection: {
                    where: {
                        is_collection: true,
                    },
                    include: {
                        animes: true,
                    },
                },
            },
        });
        return {
            success: true,
            user: user as any,
        };
    }
}
