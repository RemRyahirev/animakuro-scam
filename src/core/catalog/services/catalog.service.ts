import { GetCatalogAnimeResultsType } from '../models/results/get-catalog-anime-results.type';
import { CatalogAnimeInputType } from '../models/inputs/catalog-anime-input.type';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/services/prisma.service';
import { PaginationService } from '../../../common/services/pagination.service';
import { CatalogGrpcService } from './catalog.grpc.service';
import { PaginationInputType } from '../../../common/models/inputs';
import { CatalogIndices } from '../models/enums/catalog-indices.enum';
import { GetCatalogAuthorResultsType } from '../models/results/get-catalog-author-results.type';
import { createCatalogAuthorOptions } from '../utils/create-catalog-author-options';
import { CatalogAuthorInputType } from '../models/inputs/catalog-author-input.type';
import { CatalogStudioInputType } from '../models/inputs/catalog-studio-input.type';
import { GetCatalogStudioResultsType } from '../models/results/get-catalog-studio-results.type';
import { createCatalogStudioOptions } from '../utils/create-catalog-studio-options';
import { CatalogCharacterInputType } from '../models/inputs/catalog-character-input.type';
import { createCatalogCharacterOptions } from '../utils/create-catalog-character-options';
import { CatalogCharacterSearchTable } from '../models/enums/catalog-character-search-table.enum';
import { CatalogAuthorSearchTable } from '../models/enums/catalog-author-search-table.enum';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Prisma } from '@prisma/client';
import { ElasticResults } from '../models/interfaces/elastic-response.type';
import { createCatalogAnimeOptions } from '../utils/create-catalog-anime-options';

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
        const {
            search,
            sort_field,
            sort_order,
            ...filterOptions
        } = args;
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
            character_list: character_list as any,
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
        A extends PaginationInputType,
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

    private takeByPages<T extends Array<{}>, A extends PaginationInputType>(
        list: T,
        pages: A,
    ) {
        return list.slice(
            (pages.page - 1) * pages.perPage,
            pages.page * pages.perPage,
        );
    }
}
