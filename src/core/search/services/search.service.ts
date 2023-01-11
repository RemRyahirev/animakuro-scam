import { GetListSearchAnimeResultsType } from '../models/results/get-list-search-anime-results.type';
import { SearchAnimeInputType } from '../models/inputs/search-anime-input.type';
import { Prisma } from '@prisma/client';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/services/prisma.service";
import { PaginationService } from "../../../common/services/pagination.service";

@Injectable()
export class SearchService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getSearchAnimeList(
        args: SearchAnimeInputType,
    ): Promise<GetListSearchAnimeResultsType> {
        // So far without filter, sorting and pagination
        // const prismaOptions: Prisma.AnimeFindManyArgs = {};

        const animeList = await this.prisma.anime.findMany({
            where: {
                id: {
                    in: [],
                },
                // ...args.filter,
            },
            select: {
                id: true,
                title: true,
                year: true,
                format: true,
                episodes: true,
                preview_link: true,
            },
        });

        return {
            success: true,
            errors: [],
            animeList: animeList as any,
        };
    }
}
