import { PrismaService } from '../../../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetProfileSettingsByIdResultsType } from '../models/results/get-profile-settings-results.type';
import { CreateProfileSettingsInputType } from '../models/inputs/create-profile-settings-input.type';
import { DeleteProfileSettingsResultsType } from '../models/results/delete-profile-settings-results.type';
import { UpdateProfileSettingsInputType } from '../models/inputs/update-profile-settings-input.type';
import { CreateProfileSettingsResultsType } from '../models/results/create-profile-settings-results.type';
import { UpdateProfileSettingsResultsType } from '../models/results/update-profile-settings-results.type';
import { PaginationService } from '../../../common/services/pagination.service';
import { PaginationInputType } from '../../../common/models/inputs/pagination-input.type';
import { GetListProfileSettingsResultsType } from '../models/results/get-list-profile-settings-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';

@Injectable()
export class ProfileSettingsService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getProfileSettingsList(
        args: PaginationInputType,
    ): Promise<GetListProfileSettingsResultsType> {
        const profileSettingsList = await this.prisma.profileSettings.findMany({
            ...transformPaginationUtil(args),
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'profileSettings',
            args,
        );

        return {
            success: true,
            errors: [],
            userProfileList: profileSettingsList as any,
            pagination,
        };
    }

    async getProfileSettings(
        id: string,
    ): Promise<GetProfileSettingsByIdResultsType> {
        const profileSettings = await this.prisma.profileSettings.findUnique({
            where: {
                id,
            },
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return {
            success: true,
            errors: [],
            profileSettings: profileSettings as any,
        };
    }

    async createProfileSettings(
        args: CreateProfileSettingsInputType,
    ): Promise<CreateProfileSettingsResultsType> {
        const profileSettings = await this.prisma.profileSettings.create({
            data: args,
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            success: true,
            profileSettings: profileSettings as any,
        };
    }

    async updateProfileSettings(
        args: UpdateProfileSettingsInputType,
    ): Promise<UpdateProfileSettingsResultsType> {
        const profileSettings = await this.prisma.profileSettings.update({
            where: { id: args.id },
            data: args,
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            success: true,
            profileSettings: profileSettings as any,
        };
    }

    async deleteProfileSettings(
        id: string,
    ): Promise<DeleteProfileSettingsResultsType> {
        const profileSettings = await this.prisma.profileSettings.delete({
            where: { id },
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            success: true,
            profileSettings: profileSettings as any,
        };
    }
}
