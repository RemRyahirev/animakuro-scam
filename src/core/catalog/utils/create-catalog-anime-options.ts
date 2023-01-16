import { CatalogAnimeInputType } from '../models/inputs/catalog-anime-input.type';
import { Prisma } from '@prisma/client';
import { CatalogSortField } from '../models/enums/catalog-sort-field.enum';
import { ReleaseStatus } from '../../../common/models/enums';
import { CatalogAnimeSort } from '../models/interfaces/catalog-anime-sort';

export function createCatalogAnimeOptions(
    elasticResults: string[],
    options: Omit<CatalogAnimeInputType, 'search'>,
    sort: CatalogAnimeSort,
): Prisma.AnimeFindManyArgs {
    const { genres, date_start, date_end, ...filterOptions } = { ...options };
    const prismaOptions: Prisma.AnimeFindManyArgs = {
        where: {
            id: {
                in: elasticResults,
            },
            ...filterOptions,
            genres: {
                some: {
                    genre_name: {
                        in: genres,
                    },
                },
            },
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
