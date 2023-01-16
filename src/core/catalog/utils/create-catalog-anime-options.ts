import { CatalogAnimeInputType } from '../models/inputs/catalog-anime-input.type';
import { Prisma } from '@prisma/client';
import { CatalogSortField } from '../models/enums/catalog-sort-field.enum';
import { ReleaseStatus } from '../../../common/models/enums';
import { CatalogAnimeSort } from '../models/interfaces/catalog-anime-sort';
import { PaginationInputType } from "../../../common/models/inputs";
import { transformPaginationUtil } from "../../../common/utils/transform-pagination.util";

export function createCatalogAnimeOptions(
    elasticResults: string[],
    options: Omit<CatalogAnimeInputType, 'search' | 'sortField' | 'sortOrder'>,
    sort: CatalogAnimeSort,
    pagination: PaginationInputType
): Prisma.AnimeFindManyArgs {
    const { genres, date_start, date_end, ...filterOptions } = { ...options };
    const prismaOptions: Prisma.AnimeFindManyArgs = {
        ...transformPaginationUtil(pagination),
        where: {
            id: {
                in: elasticResults,
            },
            ...filterOptions,
            date_start: {
                gte: date_start
            },
            date_end: {
                lte: date_end
            }
        },
        select: {
            id: true,
            title: true,
            year: true,
            format: true,
            episodes: true,
            preview_link: true,
        },
    };

    if (sort.sortField === CatalogSortField.RELEASE_DATE) {
        prismaOptions.where = {
            ...prismaOptions.where,
            release_status: ReleaseStatus.ANNOUNCEMENT,
            date_end: null,
            date_start: {
                not: null,
            },
        };
        prismaOptions.orderBy = {
            date_start: sort.sortOrder,
        };
    } else if (sort.sortField) {
        prismaOptions.orderBy = {
            [sort.sortField]: sort.sortOrder,
        };
    }

    return prismaOptions;
}
