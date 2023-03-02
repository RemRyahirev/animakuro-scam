import { Injectable } from '@nestjs/common';

import { PaginationInputType } from '@app/common/models/inputs';
import { FileUploadService } from '@app/common/services/file-upload.service';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { entityUpdateUtil } from '@app/common/utils/entity-update.util';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { DeleteStudioResultsType } from '../models/results/delete-studio-results.type';
import { GetStudioResultsType } from '../models/results/get-studio-results.type';
import { GetListStudioResultsType } from '../models/results/get-list-studio-results.type';
import { UpdateStudioInputType } from '../models/inputs/update-studio-input.type';
import { UpdateStudioResultsType } from '../models/results/update-studio-results.type';
import { CreateStudioInputType } from '../models/inputs/create-studio-input.type';
import { CreateStudioResultsType } from '../models/results/create-studio-results.type';
import { Studio } from '../models/studio.model';

@Injectable()
export class StudioService {
    thumbnailFiles;

    constructor(
        private prisma: PrismaService,
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
        args: PaginationInputType,
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
        args: CreateStudioInputType,
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
        args: UpdateStudioInputType,
        user_id: string,
    ): Promise<UpdateStudioResultsType> {
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
        args: CreateStudioInputType | UpdateStudioInputType,
    ) {
        let animeCount: number;
        if (args instanceof CreateStudioInputType) {
            if (!args.animes_to_add) {
                animeCount = 0;
            } else {
                animeCount = args.animes_to_add.length;
            }
        }
        if (args instanceof UpdateStudioInputType) {
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
