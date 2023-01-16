import { SearchAnimeInputType } from '../models/inputs/search-anime-input.type';
import { Prisma } from '@prisma/client';
import { SearchSortField } from '../models/enums/search-sort-field.enum';
import { ReleaseStatus } from '../../../common/models/enums';
import { CatalogAnimeSort } from "../models/interfaces/catalog-anime-sort";

export function createSearchPrismaOptions(
    elasticResults: string[],
    options: Omit<SearchAnimeInputType, 'search'>,
    sort: CatalogAnimeSort,
): Prisma.AnimeFindManyArgs {
    const { genres, ...filterOptions } = { ...options };
    const prismaOptions: Prisma.AnimeFindManyArgs = {
        where: {
            id: {
                in: elasticResults,
            },
            ...filterOptions,
            genres: {
                some: {
                    genre_name: {
                        in: genres
                    }
                }
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

    if (sort.sortField === SearchSortField.RELEASE_DATE) {
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
