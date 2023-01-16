import { GetListCatalogAnimeResultsType } from '../models/results/get-list-catalog-anime-results.type';
import { CatalogAnimeInputType } from '../models/inputs/catalog-anime-input.type';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma.service';
import { PaginationService } from '../../../common/services/pagination.service';
import { createCatalogAnimeOptions } from '../utils/create-catalog-anime-options';
import { CatalogGrpcService } from './catalog.grpc.service';
import { PaginationInputType } from "../../../common/models/inputs";

@Injectable()
export class CatalogService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        private catalogGrpcService: CatalogGrpcService,
    ) {}

    async getCatalogAnimeList(
        args: CatalogAnimeInputType,
        pages: PaginationInputType
    ): Promise<GetListCatalogAnimeResultsType> {
        const { search, sortField, sortOrder, ...filterOptions } = args;
        const sort = { sortField, sortOrder };
        const elasticResults = await this.catalogGrpcService.searchDocument(
            args.search || '',
        );

        const prismaOptions = createCatalogAnimeOptions(
            elasticResults.results.map((r) => r.id),
            filterOptions,
            sort,
            pages
        );

        const animeList = await this.prisma.anime.findMany(prismaOptions);

        const pagination = await this.paginationService.getPagination('anime', pages);

        return {
            success: true,
            errors: [],
            animeList: animeList as any,
            pagination
        };
    }
}
