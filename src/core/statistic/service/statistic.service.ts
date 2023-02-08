import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetUserStatisticFolderResultsType } from '../models/results';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getUserStatisticFolder(
        id: string,
    ): Promise<GetUserStatisticFolderResultsType> {
        console.log("ss: ", id);
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
        console.log(folders);

        return {
            success: true,
            errors: [],
            userStatisticFolders: null,
        };
    }
}
