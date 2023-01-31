import { CreateProfileFolderInputType } from '../models/inputs/create-profile-folder-input.type';
import { UpdateProfileFolderInputType } from '../models/inputs/update-profile-folder-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetProfileFolderResultsType } from '../models/results/get-profile-folder-results.type';
import { GetListProfileFolderResultsType } from '../models/results/get-list-profile-folder-results.type';
import { CreateProfileFolderResultsType } from '../models/results/create-profile-folder-results.type';
import { UpdateProfileFolderResultsType } from '../models/results/update-profile-folder-results.type';
import { DeleteProfileFolderResultsType } from '../models/results/delete-profile-folder-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';
import { entityUpdateUtil } from '../../../common/utils/entity-update.util';

@Injectable()
export class ProfileFolderService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getProfileFolder(id: string): Promise<GetProfileFolderResultsType> {
        const profileFolder = await this.prisma.profileFolder.findUnique({
            where: {
                id,
            },
            include: {
                profile: true,
                animes: true,
            },
        });
        return {
            success: true,
            errors: [],
            profileFolder: profileFolder as any,
        };
    }

    async getProfileFolderList(
        args: PaginationInputType,
    ): Promise<GetListProfileFolderResultsType> {
        const profileFolderList = await this.prisma.profileFolder.findMany({
            ...transformPaginationUtil(args),
            include: {
                profile: true,
                animes: true,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'profileFolder',
            args,
        );
        return {
            success: true,
            errors: [],
            profileFolderList: profileFolderList as any,
            pagination,
        };
    }

    async createProfileFolder(
        args: CreateProfileFolderInputType,
    ): Promise<CreateProfileFolderResultsType> {
        const profileFolder = await this.prisma.profileFolder.create({
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
            },
            include: {
                profile: true,
                animes: true,
            },
        });
        //console.log(userProfile)

        return {
            success: true,
            errors: [],
            profileFolder: profileFolder as any,
        };
    }

    async updateProfileFolder(
        args: UpdateProfileFolderInputType,
    ): Promise<UpdateProfileFolderResultsType> {
        const profileFolder = await this.prisma.profileFolder.update({
            where: { id: args.id },
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
            },
            include: {
                profile: true,
                animes: true,
            },
        });
        return {
            success: true,
            errors: [],
            profileFolder: profileFolder as any,
        };
    }

    async deleteProfileFolder(
        id: string,
    ): Promise<DeleteProfileFolderResultsType> {
        const profileFolder = await this.prisma.profileFolder.delete({
            where: { id },
            include: {
                profile: true,
                animes: true,
            },
        });
        return {
            success: true,
            errors: [],
            profileFolder: profileFolder as any,
        };
    }
}
