import { ElasticResults } from "../models/interfaces/elastic-response.type";
import { CatalogAuthorInputType } from "../models/inputs/catalog-author-input-type";
import { Prisma } from "@prisma/client";
import { PaginationInputType } from "../../../common/models/inputs";
import { CatalogAuthorSort } from "../models/interfaces/catalog-author-sort";
import { transformPaginationUtil } from "../../../common/utils/transform-pagination.util";

export function createCatalogAuthorOptions(
    elasticResults: ElasticResults,
    options: Omit<CatalogAuthorInputType, 'search' | 'sortField' | 'sortOrder'>,
    sort: CatalogAuthorSort,
    pagination: PaginationInputType,
): Prisma.AuthorFindManyArgs {
    const { ...filterOptions } = options

    const prismaOptions: Prisma.AuthorFindManyArgs = {
        ...transformPaginationUtil(pagination),
        where: {
            ...filterOptions
        }
    }

    if (sort.sortField) {
        prismaOptions.orderBy = {
            [sort.sortField]: sort.sortOrder,
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
