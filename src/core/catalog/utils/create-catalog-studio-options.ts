import { ElasticResults } from '../models/interfaces/elastic-response.type';
import { CatalogStudioInputType } from '../models/inputs/catalog-studio-input.type';
import { CatalogStudioSort } from '../models/interfaces/catalog-studio-sort';
import { PaginationInputType } from '../../../common/models/inputs';
import { Prisma } from '@prisma/client';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';

export function createCatalogStudioOptions(
    elasticResults: ElasticResults,
    options: Omit<CatalogStudioInputType, 'search' | 'sort_field' | 'sort_order'>,
    sort: CatalogStudioSort,
    pagination: PaginationInputType,
) {
    const {
        min_rating,
        min_anime_count,
        max_anime_count,
        genres,
        ...filterOptions
    } = options;

    const prismaOptions: Prisma.StudioFindManyArgs = {
        ...transformPaginationUtil(pagination),
        where: {
            ...filterOptions,
            rating: {
                gte: min_rating,
            },
            anime_count: {
                gte: min_anime_count,
                lte: max_anime_count,
            },
            anime: {
                some: {
                    genres: {
                        some: {
                            id: {
                                in: genres,
                            },
                        },
                    },
                },
            },
        },
        include: {
            anime: true,
        },
    };

    if (sort.sort_field) {
        prismaOptions.orderBy = {
            [sort.sort_field]: sort.sort_order,
        };
    }

    if (elasticResults.done) {
        prismaOptions.where = {
            ...prismaOptions.where,
            id: {
                in: elasticResults.results.map((r) => r.id),
            },
        };
    }

    return prismaOptions;
}
