import { SearchAnimeInputType } from '../models/inputs/search-anime-input.type';
import { Prisma } from '@prisma/client';
import { SearchSortField } from '../models/enums/search-sort-field.enum';
import { ReleaseStatus } from '../../../common/models/enums';
import { SearchSortInput } from '../models/inputs/search-sort-input';

export function createSearchPrismaOptions(
    elasticResults: string[],
    filterOptions: Omit<SearchAnimeInputType, 'search' | 'genres'>,
    sort: SearchSortInput,
): Prisma.AnimeFindManyArgs {
    const prismaOptions: Prisma.AnimeFindManyArgs = {
        where: {
            id: {
                in: elasticResults,
            },
            ...filterOptions,
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
