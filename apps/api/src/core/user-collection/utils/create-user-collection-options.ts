import { Prisma } from '@prisma/client';
import { GetUserCollectionInputType } from '../models/inputs';
import { UserCollectionSort } from '../models/interfaces/user-collection-sort';

export function createUserCollectionOptions({
    user_id,
    option: {
        start_created_at,
        end_created_at,
        start_updated_at,
        end_updated_at,
        ...sort
    },
}: {
    user_id?: string;
    option: GetUserCollectionInputType;
}) {
    const prismaOptions: Prisma.UserFolderFindManyArgs = {
        include: {
            user: {
                include: {
                    user_profile: {
                        include: {
                            profile_settings: true,
                        },
                    },
                    user_folders: {
                        include: {
                            animes: true,
                        },
                    },
                    auth: true,
                    favourite_animes: true,
                    favourite_authors: true,
                    favourite_genres: true,
                    favourite_characters: true,
                    favourite_studios: true,
                },
            },
            animes: true,
        },
        where: {
            created_at: {
                gte: start_created_at,
                lte: end_created_at,
            },
            updated_at: {
                gte: start_updated_at,
                lte: end_updated_at,
            },
            is_collection: true,
            is_public: true,
        },
    };

    if (sort.sort_field) {
        prismaOptions.orderBy = {
            [sort.sort_field]: sort.sort_order,
        };
    }

    if (user_id) {
        prismaOptions.where = {
            ...prismaOptions.where,
            user_id,
        };
    }

    return prismaOptions;
}
