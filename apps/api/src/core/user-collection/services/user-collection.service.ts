import { Injectable } from '@nestjs/common';

import { PaginationInputType } from '@app/common/models/inputs';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { entityUpdateUtil } from '@app/common/utils/entity-update.util';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { CreateUserCollectionInputType } from '../models/inputs/create-user-collection-input.type';
import { UpdateUserCollectionInputType } from '../models/inputs/update-user-collection-input.type';
import { GetUserCollectionResultsType } from '../models/results/get-user-collection-results.type';
import { GetListUserCollectionResultsType } from '../models/results/get-list-user-collection-results.type';
import { CreateUserCollectionResultsType } from '../models/results/create-user-collection-results.type';
import { UpdateUserCollectionResultsType } from '../models/results/update-user-collection-results.type';
import { DeleteUserCollectionResultsType } from '../models/results/delete-user-collection-results.type';
import { UpdateRatingUserCollectionInputType } from '../models/inputs';
import { UpdateRatingUserCollectionResultsType } from '../models/results';
import { RatingUserCollection } from '../models/rating-user-collection.model';
import { StatisticService } from '@app/common/services/statistic.service';
import { FileUploadService } from '@app/common/services/file-upload.service';

@Injectable()
export class UserCollectionService {
    thumbnailFiles;
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
        private fileUpload: FileUploadService,
        private statistics: StatisticService,
    ) {
        this.thumbnailFiles = this.fileUpload.getStorageForOne(
            'userFolder',
            'thumbnail_id',
            'userCollectionThumbnails',
        );
    }

    async getUserCollection(id: string): Promise<GetUserCollectionResultsType> {
        const userCollection = await this.prisma.userFolder.findMany({
            where: {
                id,
                is_collection: true,
            },
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
        });

        return {
            success: true,
            errors: [],
            userCollection: userCollection[0] as any,
        };
    }

    async getUserCollectionListByUserId(
        user_id: string,
        args: PaginationInputType,
    ): Promise<GetListUserCollectionResultsType> {
        const userCollectionList = await this.prisma.userFolder.findMany({
            ...transformPaginationUtil(args),
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
            // orderBy: { created_at: 'desc', name: 'asc' }, // сотртировка по дате от свежих и имени от а до я
            where: {
                is_collection: true,
                user_id,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'userFolder',
            args,
        );
        return {
            success: true,
            errors: [],
            userCollectionList: userCollectionList as any,
            pagination,
        };
    }

    async getUserCollectionList(
        args: PaginationInputType,
    ): Promise<GetListUserCollectionResultsType> {
        const userCollectionList = await this.prisma.userFolder.findMany({
            ...transformPaginationUtil(args),
            where: {
                is_collection: true,
            },
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
        });
        const pagination = await this.paginationService.getPagination(
            'userFolder',
            args,
        );
        return {
            success: true,
            errors: [],
            userCollectionList: userCollectionList as any,
            pagination,
        };
    }

    async createUserCollection(
        args: CreateUserCollectionInputType,
        user_id: string,
    ): Promise<CreateUserCollectionResultsType> {
        const userCollection = await this.prisma.userFolder.create({
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
                is_collection: true,
                user: {
                    connect: {
                        id: user_id,
                    },
                },
                thumbnail: await this.thumbnailFiles.tryCreate(
                    args.thumbnail,
                    user_id,
                ),
            },
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
                thumbnail: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            success: true,
            errors: [],
            userCollection: userCollection as any,
        };
    }

    async updateUserCollection(
        args: UpdateUserCollectionInputType,
        user_id: string,
    ): Promise<UpdateUserCollectionResultsType> {
        const userCollection = await this.prisma.userFolder.update({
            where: { id: args.id },
            data: {
                ...entityUpdateUtil('animes', args),
                ...args,
                user: {
                    connect: {
                        id: user_id,
                    },
                },
                thumbnail: await this.thumbnailFiles.tryUpdate(
                    { id: args.id },
                    args.thumbnail,
                    undefined,
                    user_id,
                ),
            },
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
                thumbnail: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return {
            success: true,
            errors: [],
            userCollection: userCollection as any,
        };
    }

    async deleteUserCollection(
        id: string,
    ): Promise<DeleteUserCollectionResultsType> {
        await this.thumbnailFiles.tryDeleteAll({ id });
        const userCollection = await this.prisma.userFolder.delete({
            where: { id },
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
                thumbnail: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return {
            success: true,
            errors: [],
            userCollection: userCollection as any,
        };
    }
    async updateRatingUserCollection(
        args: RatingUserCollection,
    ): Promise<UpdateRatingUserCollectionResultsType> {
        let ratingUserCollection: RatingUserCollection;

        const existRating = await this.prisma.ratingUserCollection.findUnique({
            where: {
                user_id_collection_id: {
                    collection_id: args.collection_id,
                    user_id: args.user_id,
                },
            },
        });
        if (existRating) {
            ratingUserCollection =
                await this.prisma.ratingUserCollection.update({
                    data: args,
                    where: {
                        user_id_collection_id: {
                            collection_id: args.collection_id,
                            user_id: args.user_id,
                        },
                    },
                });
            this.statistics.fireEvent(
                'userCollectionRate',
                {
                    collectionId: args.collection_id,
                    stars: existRating.rating,
                },
                -1,
            );
        } else {
            ratingUserCollection =
                await this.prisma.ratingUserCollection.create({
                    data: args,
                });
        }
        this.statistics.fireEvent(
            'userCollectionRate',
            {
                collectionId: args.collection_id,
                stars: args.rating,
            },
            1,
        );

        return {
            success: true,
            errors: [],
            rating: ratingUserCollection.rating,
        };
    }
}
