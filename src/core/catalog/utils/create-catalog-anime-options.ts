import { CatalogAnimeInputType } from '../models/inputs/catalog-anime-input.type';
import { Prisma } from '@prisma/client';
import { CatalogAnimeSortField } from '../models/enums/catalog-anime-sort-field.enum';
import { ReleaseStatus } from '../../../common/models/enums';
import { CatalogAnimeSort } from '../models/interfaces/catalog-anime-sort';
import { ElasticResults } from '../models/interfaces/elastic-response.type';

export function createCatalogAnimeOptions(
    elasticResults: ElasticResults,
    options: Omit<
        CatalogAnimeInputType,
        'search' | 'sort_field' | 'sort_order'
    >,
    sort: CatalogAnimeSort,
): Prisma.AnimeFindManyArgs {
    const {
        genres,
        studios,
        date_start,
        date_end,
        start_created_at,
        end_created_at,
        start_updated_at,
        end_updated_at,
        ...filterOptions
    } = options;

    const prismaOptions: Prisma.AnimeFindManyArgs = {
        where: {
            ...filterOptions,
            genres: genres
                ? {
                      some: {
                          id: {
                              in: genres,
                          },
                      },
                  }
                : {},
            studios: studios
                ? {
                      some: {
                          id: {
                              in: studios,
                          },
                      },
                  }
                : {},
            date_start: date_start
                ? {
                      gte: date_start,
                  }
                : {},
            date_end: date_end
                ? {
                      lte: date_end,
                  }
                : {},
            created_at: {
                gte: start_created_at,
                lte: end_created_at,
            },
            updated_at: {
                gte: start_updated_at,
                lte: end_updated_at,
            },
        },
        include: {
            genres: true,
            authors: true,
            characters: true,
            studios: true,
            relating_animes: true,
            similar_animes: true,
            airing_schedule: true,
        },
    };

    if (sort.sort_field === CatalogAnimeSortField.RELEASE_DATE) {
        prismaOptions.where = {
            ...prismaOptions.where,
            release_status: ReleaseStatus.ANNOUNCEMENT,
            date_end: null,
            date_start: {
                not: null,
            },
        };
        prismaOptions.orderBy = {
            date_start: sort.sort_order,
        };
    } else if (sort.sort_field) {
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
