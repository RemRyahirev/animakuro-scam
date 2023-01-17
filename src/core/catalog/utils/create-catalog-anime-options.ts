import { CatalogAnimeInputType } from '../models/inputs/catalog-anime-input.type';
import { Prisma } from '@prisma/client';
import { CatalogAnimeSortField } from '../models/enums/catalog-anime-sort-field.enum';
import { ReleaseStatus } from '../../../common/models/enums';
import { CatalogAnimeSort } from '../models/interfaces/catalog-anime-sort';
import { PaginationInputType } from '../../../common/models/inputs';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { ElasticResults } from '../models/interfaces/elastic-response.type';

export function createCatalogAnimeOptions(
    elasticResults: ElasticResults,
    options: Omit<CatalogAnimeInputType, 'search' | 'sortField' | 'sortOrder'>,
    sort: CatalogAnimeSort,
    pagination: PaginationInputType,
): Prisma.AnimeFindManyArgs {
    const { genres, date_start, date_end, ...filterOptions } = options;

    const prismaOptions: Prisma.AnimeFindManyArgs = {
        ...transformPaginationUtil(pagination),
        where: {
            ...filterOptions,
            genres: {
                some: {
                    id: {
                        in: genres,
                    },
                },
            },
            date_start: {
                gte: date_start,
            },
            date_end: {
                lte: date_end,
            },
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
