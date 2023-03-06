import { Prisma } from '@prisma/client';

import { ElasticResults } from '../models/interfaces/elastic-response.type';
import { CatalogStudioArgsType } from '../models/inputs/catalog-studio-args.type';
import { CatalogStudioSort } from '../models/interfaces/catalog-studio-sort';

export function createCatalogStudioOptions(
    elasticResults: ElasticResults,
    options: Omit<CatalogStudioArgsType, 'search' | 'sort_field' | 'sort_order'>,
    sort: CatalogStudioSort,
) {
    const {
        min_rating,
        min_anime_count,
        max_anime_count,
        genres,
        ...filterOptions
    } = options;

    const prismaOptions: Prisma.StudioFindManyArgs = {
        where: {
            ...filterOptions,
            rating: {
                gte: min_rating,
            },
            anime_count: {
                gte: min_anime_count,
                lte: max_anime_count,
            },
            animes: {
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
            animes: true,
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
