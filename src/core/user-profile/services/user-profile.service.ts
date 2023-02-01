import { CreateUserProfileInputType } from '../models/inputs/create-user-profile-input.type';
import { UpdateUserProfileInputType } from '../models/inputs/update-user-profile-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetUserProfileResultsType } from '../models/results/get-user-profile-results.type';
import { GetListUserProfileResultsType } from '../models/results/get-list-user-profile-results.type';
import { CreateUserProfileResultsType } from '../models/results/create-user-profile-results.type';
import { UpdateUserProfileResultsType } from '../models/results/update-user-profile-results.type';
import { DeleteUserProfileResultsType } from '../models/results/delete-user-profile-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';
import { profileDefaults } from './defaults/profile-defaults';
import { UpdateProfileFavouritesInputType } from '../models/inputs/update-profile-favourites-input.type';
import { mediaConnectUtil } from '../utils/media-connect.util';

@Injectable()
export class UserProfileService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getUserProfile(id: string): Promise<GetUserProfileResultsType> {
        const userProfile = await this.prisma.userProfile.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                profile_settings: true,
                favourite_animes: true,
                favourite_characters: true,
                favourite_authors: true,
                favourite_genres: true,
                favourite_studios: true,
                profile_folders: true,
            },
        });
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
            ...transformPaginationUtil(args),
            include: {
                user: true,
                profile_settings: true,
                favourite_animes: true,
                favourite_characters: true,
                favourite_authors: true,
                favourite_genres: true,
                favourite_studios: true,
                profile_folders: true,
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
    ): Promise<CreateUserProfileResultsType> {
        const { user_id, ...other } = args;
        const userProfile = await this.prisma.userProfile.create({
            data: {
                ...(other as any),
                ...profileDefaults,
                user: {
                    connect: {
                        id: user_id,
                    },
                },
            },
            include: {
                user: true,
                profile_settings: true,
                profile_folders: true,
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
    ): Promise<UpdateUserProfileResultsType> {
        const userProfile = await this.prisma.userProfile.update({
            where: { id: args.id },
            data: args as any,
            include: {
                user: true,
                profile_settings: true,
                favourite_animes: true,
                favourite_characters: true,
                favourite_authors: true,
                favourite_genres: true,
                favourite_studios: true,
                profile_folders: true,
            },
        });
        return {
            success: true,
            errors: [],
            userProfile: userProfile as any,
        };
    }

    async updateProfileFavourites(
        args: UpdateProfileFavouritesInputType,
    ): Promise<UpdateUserProfileResultsType> {
        const userProfile = await this.prisma.userProfile.update({
            where: { id: args.id },
            data: {
                ...mediaConnectUtil(args),
            },
            include: {
                favourite_animes: true,
                favourite_characters: true,
                favourite_authors: true,
                favourite_genres: true,
                favourite_studios: true,
                profile_settings: true,
                profile_folders: true,
                user: true,
            },
        });

        return {
            success: true,
            errors: [],
            userProfile: userProfile as any,
        };
    }

    async deleteUserProfile(id: string): Promise<DeleteUserProfileResultsType> {
        const userProfile = await this.prisma.userProfile.delete({
            where: { id },
        });
        return {
            success: true,
            errors: [],
            userProfile: userProfile as any,
        };
    }
}
