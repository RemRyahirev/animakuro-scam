import {GetCatalogAnimeResultsType} from '../models/results/get-catalog-anime-results.type';
import {CatalogAnimeInputType} from '../models/inputs/catalog-anime-input.type';
import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../../common/services/prisma.service';
import {PaginationService} from '../../../common/services/pagination.service';
import {createCatalogAnimeOptions} from '../utils/create-catalog-anime-options';
import {CatalogGrpcService} from './catalog.grpc.service';
import {PaginationInputType} from '../../../common/models/inputs';
import {CatalogIndices} from '../models/enums/catalog-indices.enum';
import {GetCatalogAuthorResultsType} from '../models/results/get-catalog-author-results.type';
import {createCatalogAuthorOptions} from '../utils/create-catalog-author-options';
import {CatalogAuthorInputType} from '../models/inputs/catalog-author-input.type';
import {CatalogStudioInputType} from '../models/inputs/catalog-studio-input.type';
import {GetCatalogStudioResultsType} from '../models/results/get-catalog-studio-results.type';
import {createCatalogStudioOptions} from '../utils/create-catalog-studio-options';
import {CatalogCharacterInputType} from '../models/inputs/catalog-character-input.type';
import {createCatalogCharacterOptions} from '../utils/create-catalog-character-options';
import {CatalogCharacterSearchTable} from '../models/enums/catalog-character-search-table.enum';
import {CatalogAuthorSearchTable} from "../models/enums/catalog-author-search-table.enum";

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
        const { search, sort_field, sort_order, ...filterOptions } = args;
        const sort = { sort_field, sort_order };

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

        const anime_list = await this.prisma.anime.findMany(prismaOptions);
        const pagination = await this.paginationService.getPagination(
            'anime',
            pages,
        );

        return {
            success: true,
            errors: [],
            anime_list: anime_list as any,
            pagination,
        };
    }

    async getCatalogAuthorList(
        args: CatalogAuthorInputType,
        pages: PaginationInputType,
    ): Promise<GetCatalogAuthorResultsType> {
        const {
            search,
            sort_field,
            sort_order,
            search_table,
            ...filterOptions
        } = args;
        const sort = { sort_field, sort_order };

        const elasticIndex =
            search_table === CatalogAuthorSearchTable.AUTHORS
                ? CatalogIndices.AUTHOR
                : CatalogIndices.ANIME;
        const elasticResults = await this.catalogGrpcService.searchDocument(
            search,
            elasticIndex,
        );

        const prismaOptions = createCatalogAuthorOptions(
            elasticResults,
            filterOptions,
            sort,
            pages,
            search_table
        );

        const author_list = await this.prisma.author.findMany(prismaOptions);
        const pagination = await this.paginationService.getPagination(
            'author',
            pages,
        );

        return {
            success: true,
            errors: [],
            author_list: author_list as any,
            pagination,
        };
    }

    async getCatalogStudioList(
        args: CatalogStudioInputType,
        pages: PaginationInputType,
    ): Promise<GetCatalogStudioResultsType> {
        const { search, sort_field, sort_order, ...filterOptions } = args;
        const sort = { sort_field, sort_order };

        const elasticResults = await this.catalogGrpcService.searchDocument(
            search,
            CatalogIndices.STUDIO,
        );

        const prismaOptions = createCatalogStudioOptions(
            elasticResults,
            filterOptions,
            sort,
            pages,
        );

        const studio_list = await this.prisma.studio.findMany(prismaOptions);
        const pagination = await this.paginationService.getPagination(
            'studio',
            pages,
        );

        return {
            success: true,
            errors: [],
            studio_list: studio_list as any,
            pagination,
        };
    }

    async getCatalogCharacterList(
        args: CatalogCharacterInputType,
        pages: PaginationInputType,
    ) {
        const {
            search,
            sort_field,
            sort_order,
            search_table,
            ...filterOptions
        } = args;
        const sort = { sort_field, sort_order };

        const elasticIndex =
            search_table === CatalogCharacterSearchTable.CHARACTERS
                ? CatalogIndices.CHARACTER
                : CatalogIndices.ANIME;
        const elasticResults = await this.catalogGrpcService.searchDocument(
            search,
            elasticIndex,
        );

        const prismaOptions = createCatalogCharacterOptions(
            elasticResults,
            filterOptions,
            sort,
            pages,
            search_table,
        );

        const character_list = await this.prisma.character.findMany(
            prismaOptions,
        );
        const pagination = await this.paginationService.getPagination(
            'character',
            pages,
        );

        return {
            success: true,
            errors: [],
            character_list: character_list as any,
            pagination,
        };
    }
}
