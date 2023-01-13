import { GetListSearchAnimeResultsType } from '../models/results/get-list-search-anime-results.type';
import { SearchAnimeInputType } from '../models/inputs/search-anime-input.type';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma.service';
import { PaginationService } from '../../../common/services/pagination.service';
import { createSearchPrismaOptions } from '../utils/create-search-prisma-options';
import { SearchGrpcService } from './search.grpc.service';

@Injectable()
export class SearchService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        private searchGrpcService: SearchGrpcService,
    ) {}

    async getSearchAnimeList(
        args: SearchAnimeInputType,
    ): Promise<GetListSearchAnimeResultsType> {
        const { search, sortField, sortOrder, ...filterOptions } = args;
        const sort = { sortField, sortOrder };
        const elasticResults = await this.searchGrpcService.searchDocument(
            args.search || '',
        );

        const prismaOptions = createSearchPrismaOptions(
            elasticResults.results.map((r) => r.id),
            filterOptions,
            sort,
        );

        const animeList = await this.prisma.anime.findMany(prismaOptions);

        return {
            success: true,
            errors: [],
            animeList: animeList as any,
        };
    }
}
