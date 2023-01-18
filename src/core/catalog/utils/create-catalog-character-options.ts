import { ElasticResults } from '../models/interfaces/elastic-response.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { Prisma } from '@prisma/client';
import { CatalogCharacterInputType } from '../models/inputs/catalog-character-input.type';
import { CatalogCharacterSort } from '../models/interfaces/catalog-character-sort';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';

export function createCatalogCharacterOptions(
    elasticResults: ElasticResults,
    options: Omit<
        CatalogCharacterInputType,
        'search' | 'sortField' | 'sortOrder'
    >,
    sort: CatalogCharacterSort,
    pagination: PaginationInputType,
) {
    const prismaOptions: Prisma.CharacterFindManyArgs = {
        ...transformPaginationUtil(pagination),
        include: {
            animes: true
        }
    };

    return prismaOptions;
}
