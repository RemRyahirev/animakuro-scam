import { Prisma } from '@prisma/client';

import { ElasticResults } from '../models/interfaces/elastic-response.type';
import { CatalogAuthorArgsType } from '../models/inputs/catalog-author-args.type';
import { CatalogAuthorSort } from '../models/interfaces/catalog-author-sort';
import { CatalogAuthorSearchTable } from '../models/enums/catalog-author-search-table.enum';

export function createCatalogAuthorOptions(
    elasticResults: ElasticResults,
    options: Omit<
        CatalogAuthorArgsType,
        'search' | 'sort_field' | 'sort_order'
    >,
    sort: CatalogAuthorSort,
    search_table: CatalogAuthorSearchTable | undefined,
): Prisma.AuthorFindManyArgs {
    const { min_age, max_age, ...filterOptions } = options;

    let prismaOptions: Prisma.AuthorFindManyArgs = {
        where: {
            ...filterOptions,
            age: {
                gte: min_age,
                lte: max_age,
            },
        },
    };

    if (sort.sort_field) {
        prismaOptions.orderBy = {
            [sort.sort_field]: sort.sort_order,
        };
    }

    if (
        elasticResults.done &&
        search_table === CatalogAuthorSearchTable.AUTHORS
    ) {
        prismaOptions.where = {
            ...prismaOptions.where,
            id: {
                in: elasticResults.results.map((r) => r.id),
            },
        };
    } else if (
        elasticResults.done &&
        search_table === CatalogAuthorSearchTable.ANIMES
    ) {
        prismaOptions = {
            ...prismaOptions,
            where: {
                ...prismaOptions.where,
                animes: {
                    some: {
                        id: {
                            in: elasticResults.results.map((r) => r.id),
                        },
                    },
                },
            },
            include: {
                animes: true
            }
        };
    }

    return prismaOptions;
}
