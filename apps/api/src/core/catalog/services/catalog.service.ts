import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PaginationArgsType } from '@app/common/models/inputs';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { GetCatalogAnimeResultsType } from '../models/results/get-catalog-anime-results.type';
import { CatalogAnimeArgsType } from '../models/inputs/catalog-anime-args.type';
import { CatalogIndices } from '../models/enums/catalog-indices.enum';
import { GetCatalogAuthorResultsType } from '../models/results/get-catalog-author-results.type';
import { createCatalogAuthorOptions } from '../utils/create-catalog-author-options';
import { CatalogAuthorArgsType } from '../models/inputs/catalog-author-args.type';
import { CatalogStudioArgsType } from '../models/inputs/catalog-studio-args.type';
import { GetCatalogStudioResultsType } from '../models/results/get-catalog-studio-results.type';
import { createCatalogStudioOptions } from '../utils/create-catalog-studio-options';
import { CatalogCharacterArgsType } from '../models/inputs/catalog-character-args.type';
import { createCatalogCharacterOptions } from '../utils/create-catalog-character-options';
import { CatalogCharacterSearchTable } from '../models/enums/catalog-character-search-table.enum';
import { CatalogAuthorSearchTable } from '../models/enums/catalog-author-search-table.enum';
import { ElasticResults } from '../models/interfaces/elastic-response.type';
import { createCatalogAnimeOptions } from '../utils/create-catalog-anime-options';
import { CatalogCollectionArgsType } from '../models/inputs/catalog-collection-args.type';
import { GetCatalogCollectionResultsType } from '../models/results/get-catalog-collection-results.type';
import { createCatalogCollectionOptions } from '../utils/create-catalog-collection-options';

import { CatalogGrpcService } from './catalog.grpc.service';

@Injectable()
export class CatalogService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        private catalogGrpcService: CatalogGrpcService,
    ) {}

    async getCatalogAnimeList(
        args: CatalogAnimeArgsType,
        pages: PaginationArgsType,
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
        );

        let anime_list: any[] = [];

        if (!(sort_field && sort_order) && elasticResults.done) {
            const list = await this.prisma.anime.findMany(prismaOptions);
            await this.sortByMatchScore(list, elasticResults);
            anime_list = this.takeByPages(list, pages);
        } else {
            anime_list = await this.prisma.anime.findMany({
                ...prismaOptions,
                ...transformPaginationUtil(pages),
            });
        }

        const pagination = await this.getCatalogPagination(
            'Anime',
            pages,
            prismaOptions.where,
        );

        return {
            success: true,
            errors: [],
            anime_list: anime_list as any,
            pagination,
        };
    }

    async getCatalogAuthorList(
        args: CatalogAuthorArgsType,
        pages: PaginationArgsType,
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
            search_table,
        );

        let author_list: any[];

        if (!(sort_field && sort_order) && elasticResults.done) {
            const list: any[] = await this.prisma.author.findMany(
                prismaOptions,
            );
            if (search_table === CatalogAuthorSearchTable.AUTHORS) {
                await this.sortByMatchScore(list, elasticResults);
            } else {
                list.sort((a, b) => {
                    const firstScore = elasticResults.results.find((el) => {
                        for (const anime of a.animes) {
                            return anime.id === el.id;
                        }
                    });
                    const secondScore = elasticResults.results.find((el) => {
                        for (const anime of b.animes) {
                            return anime.id === el.id;
                        }
                    });

                    if (firstScore && secondScore) {
                        if (firstScore.matchScore > secondScore.matchScore)
                            return -1;
                        return 1;
                    }
                    return 0;
                });
            }
            author_list = this.takeByPages(list, pages);
        } else {
            author_list = await this.prisma.author.findMany({
                ...prismaOptions,
                ...transformPaginationUtil(pages),
            });
        }

        const pagination = await this.getCatalogPagination(
            'Author',
            pages,
            prismaOptions.where,
        );

        return {
            success: true,
            errors: [],
            author_list: author_list as any,
            pagination,
        };
    }

    async getCatalogCollectionList(
        args: CatalogCollectionArgsType,
        pages: PaginationArgsType,
    ): Promise<GetCatalogCollectionResultsType> {
        const { search, ...sort } = args;

        const elasticResults = await this.catalogGrpcService.searchDocument(
            search,
            CatalogIndices.COLLECTION,
        );

        const prismaOptions = createCatalogCollectionOptions(
            elasticResults,
            sort,
        );

        let collection_list: any;

        if (!(sort.sort_field && sort.sort_order) && elasticResults.done) {
            const list = await this.prisma.userFolder.findMany(prismaOptions);
            await this.sortByMatchScore(list, elasticResults);
            collection_list = this.takeByPages(list, pages);
        } else {
            collection_list = await this.prisma.userFolder.findMany({
                ...prismaOptions,
                ...transformPaginationUtil(pages),
            });
        }

        const pagination = await this.getCatalogPagination(
            'UserFolder',
            pages,
            prismaOptions.where,
        );

        return {
            success: true,
            errors: [],
            collection_list: collection_list as any,
            pagination,
        };
    }

    async getCatalogStudioList(
        args: CatalogStudioArgsType,
        pages: PaginationArgsType,
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
        );

        let studio_list: any;

        if (!(sort_field && sort_order) && elasticResults.done) {
            const list = await this.prisma.studio.findMany(prismaOptions);
            await this.sortByMatchScore(list, elasticResults);
            studio_list = this.takeByPages(list, pages);
        } else {
            studio_list = await this.prisma.studio.findMany({
                ...prismaOptions,
                ...transformPaginationUtil(pages),
            });
        }

        const pagination = await this.getCatalogPagination(
            'Studio',
            pages,
            prismaOptions.where,
        );

        return {
            success: true,
            errors: [],
            studio_list: studio_list as any,
            pagination,
        };
    }

    async getCatalogCharacterList(
        args: CatalogCharacterArgsType,
        pages: PaginationArgsType,
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
            search_table,
        );

        let character_list: any[];

        if (!(sort_field && sort_order) && elasticResults.done) {
            const list: any[] = await this.prisma.character.findMany(
                prismaOptions,
            );
            if (search_table === CatalogCharacterSearchTable.CHARACTERS) {
                await this.sortByMatchScore(list, elasticResults);
            } else {
                list.sort((a, b) => {
                    const firstScore = elasticResults.results.find((el) => {
                        for (const anime of a.animes) {
                            return anime.id === el.id;
                        }
                    });
                    const secondScore = elasticResults.results.find((el) => {
                        for (const anime of b.animes) {
                            return anime.id === el.id;
                        }
                    });

                    if (firstScore && secondScore) {
                        if (firstScore.matchScore > secondScore.matchScore)
                            return -1;
                        return 1;
                    }
                    return 0;
                });
            }
            character_list = this.takeByPages(list, pages);
        } else {
            character_list = await this.prisma.character.findMany({
                ...prismaOptions,
                ...transformPaginationUtil(pages),
            });
        }

        const pagination = await this.getCatalogPagination(
            'Character',
            pages,
            prismaOptions.where,
        );

        return {
            success: true,
            errors: [],
            character_list: character_list,
            pagination,
        };
    }

    private async sortByMatchScore<T extends Array<{ id: string }>>(
        list: T,
        elasticResults: ElasticResults,
    ) {
        list.sort((a, b) => {
            const firstScore = elasticResults.results.find(
                (el) => el.id === a.id,
            );
            const secondScore = elasticResults.results.find(
                (el) => el.id === b.id,
            );

            if (firstScore && secondScore) {
                if (firstScore.matchScore > secondScore.matchScore) return -1;
                return 1;
            }
            return 0;
        });
    }

    private async getCatalogPagination<
        N extends keyof Prisma.TypeMap['model'],
        A extends PaginationArgsType,
        T extends Prisma.TypeMap['model'][N]['count']['args']['where'],
    >(entityName: N, pages: A, where: T) {
        // @ts-ignore
        const totalCount = await this.prisma[entityName].count({
            where,
        });
        return {
            page: pages.page,
            perPage: pages.perPage,
            totalCount: totalCount,
            pageCount: Math.ceil(totalCount / pages.perPage) ?? 0,
        };
    }

    private takeByPages<T extends Array<{}>, A extends PaginationArgsType>(
        list: T,
        pages: A,
    ) {
        return list.slice(
            (pages.page - 1) * pages.perPage,
            pages.page * pages.perPage,
        );
    }
}
