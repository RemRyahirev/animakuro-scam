import { PrismaService } from '../../../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetProfileFavouritesByIdResultsType } from '../models/results/get-profile-favourites-by-id-results.type';
import { CreateProfileFavouritesInputType } from '../models/inputs/create-profile-favourites-input.type';
import { DeleteProfileFavouritesResultsType } from '../models/results/delete-profile-favourites-results.type';
import { UpdateProfileFavouritesInputType } from '../models/inputs/update-profile-settings-input.type';
import { CreateProfileFavouritesResultsType } from '../models/results/create-profile-favourites-results.type';
import { UpdateProfileFavouritesResultsType } from '../models/results/update-profile-favourites-results.type';
import { PaginationService } from '../../../common/services/pagination.service';
import { PaginationInputType } from '../../../common/models/inputs/pagination-input.type';
import { GetListProfileFavouritesResultsType } from '../models/results/get-list-profile-favourites-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { entityUpdateFavouritesUtil } from '../utils/entity-update-favourites.util';
import { GetProfileFavouritesResultsType } from '../models/results/get-profile-favourites-results.type';
import { profileFavoritesUtil } from '../utils/profile-favorites.util';

@Injectable()
export class ProfileFavouritesService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getProfileFavouritesList(
        args: PaginationInputType,
    ): Promise<GetListProfileFavouritesResultsType> {
        const profileFavouritesList =
            await this.prisma.profileFavourites.findMany({
                ...transformPaginationUtil(args),
                include: {
                    animes: true,
                    authors: true,
                    genres: true,
                    characters: true,
                    studios: true,
                    profile: true,
                },
            });
        const pagination = await this.paginationService.getPagination(
            'profileFavourites',
            args,
        );

        return {
            success: true,
            errors: [],
            profileFavouritesList: profileFavouritesList as any,
            pagination,
        };
    }

    async getProfileFavourites(
        profile_id: string,
    ): Promise<GetProfileFavouritesResultsType> {
        const profileFavourites = await this.prisma.profileFavourites.findMany({
            where: {
                profile_id,
            },
            include: {
                animes: true,
                authors: true,
                genres: true,
                characters: true,
                studios: true,
                profile: true,
            },
        });

        const prettifiedOutput = profileFavoritesUtil(profileFavourites);

        return {
            success: true,
            errors: [],
            profileFavourites: prettifiedOutput as any,
        };
    }

    async getProfileFavouritesById(
        id: string,
    ): Promise<GetProfileFavouritesByIdResultsType> {
        const profileFavourites =
            await this.prisma.profileFavourites.findUnique({
                where: {
                    id,
                },
                include: {
                    animes: true,
                    authors: true,
                    genres: true,
                    characters: true,
                    studios: true,
                    profile: true,
                },
            });

        return {
            success: true,
            errors: [],
            profileFavourites: profileFavourites as any,
        };
    }

    async createProfileFavourites(
        args: CreateProfileFavouritesInputType,
    ): Promise<CreateProfileFavouritesResultsType> {
        const profileFavourites = await this.prisma.profileFavourites.create({
            data: {
                ...entityUpdateFavouritesUtil(args),
                ...args,
            },
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
                animes: true,
                studios: true,
                authors: true,
                characters: true,
                genres: true,
            },
        });

        return {
            success: true,
            profileFavourites: profileFavourites as any,
        };
    }

    async updateProfileFavourites(
        args: UpdateProfileFavouritesInputType,
    ): Promise<UpdateProfileFavouritesResultsType> {
        const profileFavourites = await this.prisma.profileFavourites.update({
            where: { id: args.id },
            data: {
                ...entityUpdateFavouritesUtil(args),
                ...args,
            },
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
                animes: true,
                studios: true,
                authors: true,
                characters: true,
                genres: true,
            },
        });
        return {
            success: true,
            profileFavourites: profileFavourites as any,
        };
    }

    async deleteProfileFavourites(
        id: string,
    ): Promise<DeleteProfileFavouritesResultsType> {
        const profileFavourites = await this.prisma.profileFavourites.delete({
            where: { id },
            include: {
                profile: {
                    include: {
                        user: true,
                    },
                },
                animes: true,
                studios: true,
                authors: true,
                characters: true,
                genres: true,
            },
        });
        return {
            success: true,
            profileFavourites: profileFavourites as any,
        };
    }
}
