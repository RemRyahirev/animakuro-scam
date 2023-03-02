import { Injectable } from '@nestjs/common';

import { PaginationInputType } from '@app/common/models/inputs';
import { FileUploadService } from '@app/common/services/file-upload.service';
import { PaginationService } from '@app/common/services/pagination.service';
import { PrismaService } from '@app/common/services/prisma.service';
import { StatisticService } from '@app/common/services/statistic.service';
import { transformPaginationUtil } from '@app/common/utils/transform-pagination.util';

import { CreateCharacterInputType } from '../models/inputs/create-character-input.type';
import { UpdateCharacterInputType } from '../models/inputs/update-character-input.type';
import { GetCharacterResultsType } from '../models/results/get-character-results.type';
import { GetListCharacterResultsType } from '../models/results/get-list-character-results.type';
import { GetListCharacterByAnimeIdResultsType } from '../models/results/get-list-character-by-anime-id-results.type';
import { CreateCharacterResultsType } from '../models/results/create-character-results.type';
import { UpdateCharacterResultsType } from '../models/results/update-character-results.type';
import { DeleteCharacterResultsType } from '../models/results/delete-character-results.type';

@Injectable()
export class CharacterService {
    coverFiles;

    constructor(
        private prisma: PrismaService,
        private fileUpload: FileUploadService,
        private paginationService: PaginationService,
        private statistics: StatisticService,
    ) {
        this.coverFiles = this.fileUpload.getStorageForOne(
            'character',
            'cover_id',
            'characters',
        );
    }

    async getCharacter(
        id: string,
        profile_id: string,
        favourite: boolean,
    ): Promise<GetCharacterResultsType> {
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
        const character = await this.prisma.character.findUnique({
            where: {
                id,
            },
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true,
                        studios: true,
                        ...favourite_by_validation,
                    },
                },
                ...favourite_by_validation,
                cover: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!character) {
            return {
                success: false,
                character: null,
            };
        }
        const is_favourite_result = favourite &&
            profile_id && {
                animes: character.animes.map((el: any) => ({
                    ...el,
                    is_favourite: el.favourite_by.length > 0,
                })),
                is_favourite: character.favourite_by.length > 0,
            };

        this.statistics.fireEvent(
            'getCharacter',
            {
                characterId: character.id,
            },
            1,
        );

        return {
            success: true,
            character: {
                ...character,
                ...is_favourite_result,
            } as any,
            errors: [],
        };
    }

    async getCharacterList(
        args: PaginationInputType,
        profile_id: string,
        favourite: boolean,
    ): Promise<GetListCharacterResultsType> {
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
        const characterList = await this.prisma.character.findMany({
            ...transformPaginationUtil(args),
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true,
                        studios: true,
                        ...favourite_by_validation,
                    },
                },
                ...favourite_by_validation,
                cover: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'character',
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
            character_list: characterList.map((el) => ({
                ...el,
                ...is_favourite_result(el),
            })) as any,
            pagination,
        };
    }

    async getCharacterListByAnimeId(
        id: string,
        args: PaginationInputType,
        profile_id: string,
        favourite: boolean,
    ): Promise<GetListCharacterByAnimeIdResultsType> {
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
        const characterList: any = await this.prisma.character.findMany({
            ...transformPaginationUtil(args),
            where: {
                animes: {
                    some: {
                        id,
                    },
                },
            },
            include: {
                animes: {
                    ...favourite_by_validation,
                },
                ...favourite_by_validation,
            },
        });
        const pagination = await this.paginationService.getPagination(
            'character',
            args,
            {
                nested_field: 'animes',
                search_property: 'id',
                search_value: id,
            },
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
            character_list: characterList.map((el: any) => ({
                ...el,
                ...is_favourite_result(el),
            })) as any,
            pagination,
        };
    }

    async createCharacter(
        args: CreateCharacterInputType,
        user_id: string,
    ): Promise<CreateCharacterResultsType> {
        const character = await this.prisma.character.create({
            data: {
                ...args,
                cover: await this.coverFiles.tryCreate(args.cover, user_id),
            },
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true,
                        studios: true,
                    },
                },
                cover: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            success: true,
            character: character as any,
        };
    }

    async updateCharacter(
        args: UpdateCharacterInputType,
        user_id: string,
    ): Promise<UpdateCharacterResultsType> {
        const character = await this.prisma.character.update({
            where: { id: args.id },
            data: {
                ...args,
                cover: await this.coverFiles.tryUpdate(
                    { id: args.id },
                    args.cover,
                    undefined,
                    user_id,
                ),
            },
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true,
                        studios: true,
                    },
                },
                cover: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            success: true,
            character: character as any,
        };
    }

    async deleteCharacter(id: string): Promise<DeleteCharacterResultsType> {
        await this.coverFiles.tryDeleteAll({ id });
        const character = await this.prisma.character.delete({
            where: { id },
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true,
                        studios: true,
                    },
                },
                cover: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            success: true,
            character: character as any,
        };
    }
}
