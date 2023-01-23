import { ElasticResults } from '../models/interfaces/elastic-response.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { Prisma } from '@prisma/client';
import { CatalogCharacterInputType } from '../models/inputs/catalog-character-input.type';
import { CatalogCharacterSort } from '../models/interfaces/catalog-character-sort';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { CatalogCharacterSearchTable } from '../models/enums/catalog-character-search-table.enum';

export function createCatalogCharacterOptions(
    elasticResults: ElasticResults,
    options: Omit<
        CatalogCharacterInputType,
        'search' | 'sort_field' | 'sort_order' | 'search_table'
    >,
    sort: CatalogCharacterSort,
    search_table: CatalogCharacterSearchTable | undefined
) {
    const { max_age, min_age, ...fieldsOptions } = options ;

    const prismaOptions: Prisma.CharacterFindManyArgs = {
        where: {
            ...fieldsOptions,
            age: {
                gte: min_age,
                lte: max_age,
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

    if (
        elasticResults.done &&
        search_table === CatalogCharacterSearchTable.CHARACTERS
    ) {
        prismaOptions.where = {
            ...prismaOptions.where,
            id: {
                in: [
                    '03b7d2b8-8ab4-425d-8b9c-1480de602800',
                    '0573891e-edec-492c-9793-45c04299969b',
                    '04bfafc6-eb2f-4f0e-ba52-ec634efc133a',
                ],
            },
        };
    } else if (
        elasticResults.done &&
        search_table === CatalogCharacterSearchTable.ANIMES
    ) {
        prismaOptions.where = {
            ...prismaOptions.where,
            animes: {
                some: {
                    id: {
                        in: elasticResults.results.map((r) => r.id),
                    },
                },
            },
        };
    }

    return prismaOptions;
}
