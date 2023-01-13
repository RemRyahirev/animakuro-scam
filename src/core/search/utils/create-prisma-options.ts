import { SearchAnimeInputType } from '../models/inputs/search-anime-input.type';
import { Prisma } from '@prisma/client';

export function createPrismaOptions(
    elasticResults: string[],
    filterOptions: Omit<SearchAnimeInputType, 'search' | 'genres'>,
): Prisma.AnimeFindManyArgs {
    const prismaOptions: Prisma.AnimeFindManyArgs = {
        where: {
            id: {
                in: elasticResults,
            },
            ...filterOptions
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

    return prismaOptions;
}
