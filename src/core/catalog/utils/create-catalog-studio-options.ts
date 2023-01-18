import { ElasticResults } from '../models/interfaces/elastic-response.type';
import { CatalogStudioInputType } from '../models/inputs/catalog-studio-input.type';
import { CatalogStudioSort } from '../models/interfaces/catalog-studio-sort';
import { PaginationInputType } from '../../../common/models/inputs';
import { Prisma } from '@prisma/client';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';

export function createCatalogStudioOptions(
    elasticResults: ElasticResults,
    options: Omit<CatalogStudioInputType, 'search' | 'sortField' | 'sortOrder'>,
    sort: CatalogStudioSort,
    pagination: PaginationInputType,
) {
    const prismaOptions: Prisma.StudioFindManyArgs = {
        ...transformPaginationUtil(pagination),
        include: {
            anime: true
        }
    };

    return prismaOptions;
}
