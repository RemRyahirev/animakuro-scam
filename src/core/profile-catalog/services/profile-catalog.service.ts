import { CreateProfileCatalogInputType } from '../models/inputs/create-profile-catalog-input.type';
import { UpdateProfileCatalogInputType } from '../models/inputs/update-profile-catalog-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetProfileCatalogResultsType } from '../models/results/get-profile-catalog-results.type';
import { GetListProfileCatalogResultsType } from '../models/results/get-list-profile-catalog-results.type';
import { CreateProfileCatalogResultsType } from '../models/results/create-profile-catalog-results.type';
import { UpdateProfileCatalogResultsType } from '../models/results/update-profile-catalog-results.type';
import { DeleteProfileCatalogResultsType } from '../models/results/delete-profile-catalog-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';
import { entityUpdateUtil } from '../../../common/utils/entity-update.util';

@Injectable()
export class ProfileCatalogService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getProfileCatalog(id: string): Promise<GetProfileCatalogResultsType> {
        const profileCatalog = await this.prisma.profileFolder.findMany({
            where: {
                id,
                is_catalog: true,
            },
            include: {
                profile: true,
                animes: true,
            },
        });

        return {
            success: true,
            errors: [],
            profileCatalog: profileCatalog[0] as any,
        };
    }

    async getProfileCatalogList(
        args: PaginationInputType,
    ): Promise<GetListProfileCatalogResultsType> {
        const profileCatalogList = await this.prisma.profileFolder.findMany({
            ...transformPaginationUtil(args),
            include: {
                profile: true,
                animes: true,
            },
            where: {
                is_catalog: true,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'profileFolder',
            args,
        );
        return {
            success: true,
            errors: [],
            profileCatalogList: profileCatalogList as any,
            pagination,
        };
    }

    async createProfileCatalog(
        args: CreateProfileCatalogInputType,
    ): Promise<CreateProfileCatalogResultsType> {
        const profileCatalog = await this.prisma.profileFolder.create({
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
                is_catalog: true,
            },
            include: {
                profile: true,
                animes: true,
            },
        });

        return {
            success: true,
            errors: [],
            profileCatalog: profileCatalog as any,
        };
    }

    async updateProfileCatalog(
        args: UpdateProfileCatalogInputType,
    ): Promise<UpdateProfileCatalogResultsType> {
        const profileCatalog = await this.prisma.profileFolder.update({
            where: { id: args.id },
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
            },
            include: {
                animes: true,
                profile: true,
            },
        });
        console.log(profileCatalog);

        return {
            success: true,
            errors: [],
            profileCatalog: profileCatalog as any,
        };
    }

    async deleteProfileCatalog(
        id: string,
    ): Promise<DeleteProfileCatalogResultsType> {
        const profileCatalog = await this.prisma.profileFolder.delete({
            where: { id },
            include: {
                animes: true,
                profile: true,
            },
        });

        return {
            success: true,
            errors: [],
            profileCatalog: profileCatalog as any,
        };
    }
}
