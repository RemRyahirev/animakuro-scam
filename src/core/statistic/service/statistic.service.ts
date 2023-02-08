import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import {
    GetUserStatisticFolderResultsType,
    GetUserStatisticFavouriteResultsType,
} from '../models/results';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) { }

    async getUserStatisticFolder(
        id: string,
    ): Promise<GetUserStatisticFolderResultsType> {
        const folders = await this.prisma.userFolder.findMany({
            where: {
                user: {
                    id,
                },
            },
            include: {
                _count: {
                    select: {
                        animes: true,
                    },
                },
            },
        });
        const statisticFolder = folders.map((el) => {
            return {
                folder: { ...el, _count: undefined },
                count: el._count.animes,
            };
        });
        await this.getUserStatisticFavourite(id);
        return {
            success: true,
            errors: [],
            userStatisticFolders: statisticFolder as any,
        };
    }

    async getUserStatisticFavourite(
        id: string,
    ): Promise<GetUserStatisticFavouriteResultsType> {
        const favourite: any = await this.prisma.user.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        favourite_animes: true,
                        favourite_authors: true,
                        favourite_characters: true,
                        favourite_genres: true,
                        favourite_studios: true,
                    },
                },
                favourite_animes: true,
                favourite_authors: true,
                favourite_characters: true,
                favourite_genres: true,
                favourite_studios: true,
            },
        });

        //Доделать
        const userStatisticFolders: { [x: string]: []; count: any }[] = [];
        for (const key in favourite) {
            if (key.includes('favourite_')) {
                userStatisticFolders.push({
                    [key]: favourite[key],
                    count: Number(favourite._count[key]),
                });
            }
        }
        console.log(userStatisticFolders);
        return {
            success: true,
            errors: [],
            userStatisticFolders: userStatisticFolders as any,
        };
    }
}
