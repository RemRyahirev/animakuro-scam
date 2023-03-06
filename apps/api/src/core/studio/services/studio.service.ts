import { Injectable } from '@nestjs/common';

import { PaginationArgsType } from '@app/common/models/inputs';
import { FileUploadService } from '@app/common/services/file-upload.service';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { entityUpdateUtil } from '@app/common/utils/entity-update.util';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { DeleteStudioResultsType } from '../models/results/delete-studio-results.type';
import { GetStudioResultsType } from '../models/results/get-studio-results.type';
import { GetListStudioResultsType } from '../models/results/get-list-studio-results.type';
import { UpdateStudioArgsType } from '../models/inputs/update-studio-args.type';
import { UpdateStudioResultsType } from '../models/results/update-studio-results.type';
import { CreateStudioArgsType } from '../models/inputs/create-studio-args.type';
import { CreateStudioResultsType } from '../models/results/create-studio-results.type';
import { Studio } from '../models/studio.model';
import { StatisticService } from '@app/common/services/statistic.service';

@Injectable()
export class StudioService {
    thumbnailFiles;

    constructor(
        private prisma: PrismaService,
        private statistics: StatisticService,
        private fileUpload: FileUploadService,
        private paginationService: PaginationService,
    ) {
        this.thumbnailFiles = this.fileUpload.getStorageForOne(
            'studio',
            'thumbnail_id',
            'studioThumbnails',
        );
    }

    async getStudio(
        id: string,
        profile_id: string,
        favourite: boolean,
    ): Promise<GetStudioResultsType> {
        const favourite_by_validation = {
            favourite_by: !profile_id
                ? {
                      select: {
                          id: true,
                      },
                  }
                : {
                      where: {
                          id: profile_id,
                      },
                      select: {
                          id: true,
                      },
                  },
        };
        const studio = await this.prisma.studio.findUnique({
            where: {
                id,
            },
            include: {
                animes: {
                    include: {
                        genres: true,
                        authors: true,
                        characters: true,
                        ...favourite_by_validation,
                    },
                },
                thumbnail: {
                    include: {
                        user: true,
                    },
                },
                ...favourite_by_validation,
            },
        });
        if (!studio) {
            return {
                success: false,
                studio: null,
            };
        }
        const is_favourite_result = favourite &&
            profile_id && {
                animes: studio.animes.map((el: any) => ({
                    ...el,
                    is_favourite: el.favourite_by.length > 0,
                })),
                is_favourite: studio.favourite_by.length > 0,
            };
        return {
            success: true,
            studio: { ...studio, ...is_favourite_result } as any,
            errors: [],
        };
    }

    async getStudioList(
        args: PaginationArgsType,
        profile_id: string,
        favourite: boolean,
    ): Promise<GetListStudioResultsType> {
        const favourite_by_validation = {
            favourite_by: !profile_id
                ? {
                      select: {
                          id: true,
                      },
                  }
                : {
                      where: {
                          id: profile_id,
                      },
                      select: {
                          id: true,
                      },
                  },
        };
        const studioList = await this.prisma.studio.findMany({
            ...transformPaginationUtil(args),
            include: {
                animes: {
                    include: {
                        genres: true,
                        authors: true,
                        characters: true,
                        ...favourite_by_validation,
                    },
                },
                ...favourite_by_validation,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'studio',
            args,
        );

        const is_favourite_result = (el: any) =>
            favourite &&
            profile_id && {
                animes: el.animes.map((el: any) => ({
                    ...el,
                    is_favourite: el.favourite_by.length > 0,
                })),
                is_favourite: el.favourite_by.length > 0,
            };

        return {
            success: true,
            errors: [],
            studio_list: studioList.map((el) => ({
                ...el,
                ...is_favourite_result(el),
            })) as any,
            pagination,
        };
    }

    async createStudio(
        args: CreateStudioArgsType,
        user_id: string,
    ): Promise<CreateStudioResultsType> {
        const studio = await this.prisma.studio.create({
            data: {
                ...(await this.calculateAdditionalFields(args)),
                ...entityUpdateUtil('animes', args),
                ...args,
                thumbnail: await this.thumbnailFiles.tryCreate(
                    args.thumbnail,
                    user_id,
                ),
            },
            include: {
                animes: {
                    include: {
                        genres: true,
                        authors: true,
                        characters: true,
                    },
                },
                thumbnail: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            success: true,
            studio: studio as any,
        };
    }

    async updateStudio(
        args: UpdateStudioArgsType,
        user_id: string,
    ): Promise<UpdateStudioResultsType> {
        const oldStudio = await this.prisma.studio.findUnique({
            where: { id: args.id },
            select: {
                animes: {
                    select: {
                        id: true,
                    },
                },
            }
        })
        const studio = await this.prisma.studio.update({
            where: { id: args.id },
            data: {
                ...(await this.calculateAdditionalFields(args)),
                ...entityUpdateUtil('animes', args),
                ...args,
                thumbnail: await this.thumbnailFiles.tryUpdate(
                    { id: args.id },
                    args.thumbnail,
                    undefined,
                    user_id,
                ),
            },
            include: {
                animes: {
                    include: {
                        genres: true,
                        authors: true,
                        characters: true,
                    },
                },
                thumbnail: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!studio) {
            return {
                success: false,
                studio: null,
            };
        }

        const animesToAdd = (args.animes_to_add ?? []).slice();
        const animesToRemove = (args.animes_to_remove ?? []).slice();
        const oldStudioAnimesIds = oldStudio?.animes.map(el => el.id) ?? [];

        animesToAdd.forEach(animeId => {
            if (oldStudioAnimesIds.includes(animeId)) {
                // already exists
                return;
            }

            this.statistics.fireEvent(
                'animeStudio',
                {
                    animeId,
                    studioId: studio.id,
                },
                1,
            );
        });
        animesToRemove.forEach(animeId => {
            if (!oldStudioAnimesIds.includes(animeId)) {
                // never exists
                return;
            }

            this.statistics.fireEvent(
                'animeStudio',
                {
                    animeId,
                    studioId: studio.id,
                },
                -1,
            );
        });

        return {
            success: true,
            studio: studio as any,
        };
    }

    async deleteStudio(id: string): Promise<DeleteStudioResultsType> {
        await this.thumbnailFiles.tryDeleteAll({ id });
        const studio = await this.prisma.studio.delete({
            where: { id },
            include: {
                animes: {
                    include: {
                        genres: true,
                        authors: true,
                        characters: true,
                    },
                },
                thumbnail: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            success: true,
            studio: studio as unknown as Studio,
        };
    }

    private async calculateAdditionalFields(
        args: CreateStudioArgsType | UpdateStudioArgsType,
    ) {
        let animeCount: number;
        if (args instanceof CreateStudioArgsType) {
            if (!args.animes_to_add) {
                animeCount = 0;
            } else {
                animeCount = args.animes_to_add.length;
            }
        }
        if (args instanceof UpdateStudioArgsType) {
            animeCount = await this.prisma.studio
                .findUnique({
                    where: { id: args.id },
                    include: {
                        _count: {
                            select: {
                                animes: true,
                            },
                        },
                    },
                })
                .then((item) => item?._count.animes ?? 0);
        }
        const animeYearArray: number[] = await this.prisma.anime
            .findMany({
                where: { id: { in: args.animes_to_add } },
                orderBy: { year: 'asc' },
            })
            .then((array) => array.map((item) => item.year));
        return {
            // @ts-ignore
            anime_count: animeCount,
            anime_starts: animeYearArray[0],
            anime_ends: animeYearArray[animeYearArray?.length - 1],
        };
    }
}
