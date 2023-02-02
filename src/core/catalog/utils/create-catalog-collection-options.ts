import { ElasticResults } from '../models/interfaces/elastic-response.type';
import { Prisma } from '@prisma/client';
import { CatalogCollectionSort } from '../models/interfaces/catalog-collection-sort';

export function createCatalogCollectionOptions(
    elasticResults: ElasticResults,
    sort: CatalogCollectionSort,
) {
    const prismaOptions: Prisma.UserFolderFindManyArgs = {
        include: {
            animes: true,
            user: {
                include: {
                    favourite_animes: true,
                    favourite_authors: true,
                    favourite_characters: true,
                    favourite_genres: true,
                    favourite_studios: true,
                    user_profile: true,
                },
            },
        },
        where: {
            is_collection: true,
        },
    };

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

    return prismaOptions;
}
