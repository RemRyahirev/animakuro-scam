import { GetCatalogAnimeResultsType } from '../models/results/get-catalog-anime-results.type';
import { CatalogAnimeInputType } from '../models/inputs/catalog-anime-input.type';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma.service';
import { PaginationService } from '../../../common/services/pagination.service';
import { createCatalogAnimeOptions } from '../utils/create-catalog-anime-options';
import { CatalogGrpcService } from './catalog.grpc.service';
import { PaginationInputType } from '../../../common/models/inputs';
import { CatalogIndices } from '../models/enums/catalog-indices.enum';
import { GetCatalogAuthorResultsType } from "../models/results/get-catalog-author-results.type";
import { createCatalogAuthorOptions } from "../utils/create-catalog-author-options";
import { CatalogAuthorInputType } from "../models/inputs/catalog-author-input-type";

@Injectable()
export class CatalogService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        private catalogGrpcService: CatalogGrpcService,
    ) {}

    async getCatalogAnimeList(
        args: CatalogAnimeInputType,
        pages: PaginationInputType,
    ): Promise<GetCatalogAnimeResultsType> {
        const { search, sortField, sortOrder, ...filterOptions } = args;
        const sort = { sortField, sortOrder };

        const elasticResults = await this.catalogGrpcService.searchDocument(
            search,
            CatalogIndices.ANIME,
        );

        const prismaOptions = createCatalogAnimeOptions(
            elasticResults,
            filterOptions,
            sort,
            pages,
        );

        const animeList = await this.prisma.anime.findMany(prismaOptions);

        const pagination = await this.paginationService.getPagination(
            'anime',
            pages,
        );

        return {
            success: true,
            errors: [],
            animeList: animeList as any,
            pagination,
        };
    }

    async getCatalogAuthorList(
        args: CatalogAuthorInputType,
        pages: PaginationInputType,
    ): Promise<GetCatalogAuthorResultsType> {
        const { search, sortField, sortOrder, ...filterOptions } = args;
        const sort = { sortField, sortOrder };

        const elasticResults = await this.catalogGrpcService.searchDocument(
            search,
            CatalogIndices.AUTHOR,
        );

        const prismaOptions = createCatalogAuthorOptions(
            elasticResults,
            filterOptions,
            sort,
            pages,
        );

        const authorList = await this.prisma.author.findMany(prismaOptions);

        const pagination = await this.paginationService.getPagination(
            'author',
            pages,
        );

        return {
            success: true,
            errors: [],
            authorList: authorList as any,
            pagination,
        };
    }
}
