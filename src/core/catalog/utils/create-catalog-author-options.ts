import { ElasticResults } from "../models/interfaces/elastic-response.type";
import { CatalogAuthorInputType } from "../models/inputs/catalog-author-input.type";
import { Prisma } from "@prisma/client";
import { PaginationInputType } from "../../../common/models/inputs";
import { CatalogAuthorSort } from "../models/interfaces/catalog-author-sort";
import { transformPaginationUtil } from "../../../common/utils/transform-pagination.util";

export function createCatalogAuthorOptions(
    elasticResults: ElasticResults,
    options: Omit<CatalogAuthorInputType, 'search' | 'sort_field' | 'sort_order'>,
    sort: CatalogAuthorSort,
    pagination: PaginationInputType,
): Prisma.AuthorFindManyArgs {
    const { min_age, max_age, ...filterOptions } = options

    const prismaOptions: Prisma.AuthorFindManyArgs = {
        ...transformPaginationUtil(pagination),
        where: {
            ...filterOptions,
            age: {
                gte: min_age,
                lte: max_age
            }
        }
    }

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

    return prismaOptions
}
