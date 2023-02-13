import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import {
    GetUserStatisticFolderResultsType,
    GetUserStatisticFavouriteResultsType,
} from '../models/results';
import { Injectable } from '@nestjs/common';
import { GetStatisticFolderInputType } from '../models/inputs';

@Injectable()
export class StatisticService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) { }

    async getUserStatisticFolder({
        id,
        take = 5,
        userFoldersId,
    }: GetStatisticFolderInputType): Promise<GetUserStatisticFolderResultsType> {
        const folders: any = await this.prisma.userFolder.findMany({
            where: {
                user: {
                    id,
                },
                is_statistic_active: true,
                id: userFoldersId && { in: userFoldersId },
            },
            include: {
                _count: {
                    select: {
                        animes: true,
                    },
                },
            },
            take,
        });
        const statisticFolder: any = folders.map((el: any) => {
            return {
                folder: { ...el, _count: undefined },
                count: el._count.animes,
            };
        });
        return {
            success: true,
            errors: [],
            userStatisticFolders: statisticFolder as any,
        };
    }

    async getUserStatisticFavourite(
        id: string,
    ): Promise<GetUserStatisticFavouriteResultsType> {
        const select = {
            favourite_animes: true,
            favourite_authors: true,
            favourite_characters: true,
            favourite_genres: true,
            favourite_studios: true,
        };
        const favourite: any = await this.prisma.user.findUnique({
            where: { id },
            include: {
                _count: {
                    select,
                },
                ...select,
            },
        });
        const dataFavourite: any = {};
        for (const key in favourite) {
            if (!key.includes('favourite_')) {
                dataFavourite[key] = favourite[key];
            } else {
                dataFavourite[key] = {
                    favourite: favourite[key],
                    count: favourite._count[key],
                };
            }
        }
        delete dataFavourite._count;
        return {
            success: true,
            errors: [],
            userStatisticFavourite: dataFavourite,
        };
    }
}
