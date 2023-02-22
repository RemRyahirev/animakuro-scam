import { CreateCharacterInputType } from '../models/inputs/create-character-input.type';
import { UpdateCharacterInputType } from '../models/inputs/update-character-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { GetCharacterResultsType } from '../models/results/get-character-results.type';
import { GetListCharacterResultsType } from '../models/results/get-list-character-results.type';
import { GetListCharacterByAnimeIdResultsType } from '../models/results/get-list-character-by-anime-id-results.type';
import { CreateCharacterResultsType } from '../models/results/create-character-results.type';
import { UpdateCharacterResultsType } from '../models/results/update-character-results.type';
import { DeleteCharacterResultsType } from '../models/results/delete-character-results.type';
import { transformPaginationUtil } from '../../../common/utils/transform-pagination.util';
import { Injectable } from '@nestjs/common';
import { FileUploadService } from 'common/services/file-upload.service';

@Injectable()
export class CharacterService {
    coverFiles;

    constructor(
        private prisma: PrismaService,
        private fileUpload: FileUploadService,
        private paginationService: PaginationService,
    ) {
        this.coverFiles = this.fileUpload.getStorageForOne(
            'character',
            'cover_id',
            'characters',
        );
    }

    async getCharacter(
        id: string,
        user_id: string,
        favourite: boolean,
    ): Promise<GetCharacterResultsType> {
        const favourite_by_validation = {
            favourite_by: !user_id
                ? {
                    select: {
                        id: true,
                    },
                }
                : {
                    where: {
                        id: user_id,
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
        const is_favourite_result = favourite && {
            animes: character.animes.map((el: any) => ({
                ...el,
                is_favourite: el.favourite_by.length > 0 ? true : false,
            })),
            is_favourite: character.favourite_by.length > 0 ? true : false,
        };
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
        user_id: string,
        favourite: boolean,
    ): Promise<GetListCharacterResultsType> {
        const favourite_by_validation = {
            favourite_by: !user_id
                ? {
                    select: {
                        id: true,
                    },
                }
                : {
                    where: {
                        id: user_id,
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
            favourite && {
                animes: el.animes.map((el: any) => ({
                    ...el,
                    is_favourite: el.favourite_by.length > 0 ? true : false,
                })),
                is_favourite: el.favourite_by.length > 0 ? true : false,
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
        user_id: string,
    ): Promise<GetListCharacterByAnimeIdResultsType> {
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
                favourite_by: !user_id
                    ? {
                        select: {
                            id: true,
                        },
                    }
                    : {
                        where: {
                            id: user_id,
                        },
                        select: {
                            id: true,
                        },
                    },
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

        for await (const character of characterList) {
            character?.favourite_by.length > 0 &&
                (character.is_favourite = true);
        }

        return {
            success: true,
            errors: [],
            character_list: characterList as any,
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
