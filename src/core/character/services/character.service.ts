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

@Injectable()
export class CharacterService {
    constructor(
        private prisma: PrismaService,
        private paginationService: PaginationService,
    ) {}

    async getCharacter(
        id: string,
        user_id: string,
    ): Promise<GetCharacterResultsType> {
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
                        favourite_by: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                favourite_by: {
                    select: {
                        id: true,
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

        const favourite = character?.favourite_by.find(
            (el) => el.id == user_id,
        );

        for await (const anime of character.animes) {
            const favourite = anime?.favourite_by.find(
                (el: any) => el.id == user_id,
            );
            if (favourite) {
                //@ts-ignore
                anime.is_favourite = true;
            }
        }

        if (favourite) {
            return {
                success: true,
                character: { ...character, is_favourite: true } as any,
                errors: [],
            };
        }

        return {
            success: true,
            character: character as any,
            errors: [],
        };
    }

    async getCharacterList(
        args: PaginationInputType,
        user_id: string,
    ): Promise<GetListCharacterResultsType> {
        const characterList: any = await this.prisma.character.findMany({
            ...transformPaginationUtil(args),
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true,
                        studios: true,
                        favourite_by: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                favourite_by: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        const pagination = await this.paginationService.getPagination(
            'character',
            args,
        );

        for await (const character of characterList) {
            for await (const anime of character.animes) {
                const favourite = anime?.favourite_by.find(
                    (el: any) => el.id == user_id,
                );
                if (favourite) {
                    anime.is_favourite = true;
                }
            }

            const favourite = character?.favourite_by.find(
                (el: any) => el.id == user_id,
            );
            if (favourite) {
                character.is_favourite = true;
            }
        }

        return {
            success: true,
            errors: [],
            character_list: characterList as any,
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
                favourite_by: {
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
            const favourite = character?.favourite_by.find(
                (el: any) => el.id == user_id,
            );
            if (favourite) {
                character.is_favourite = true;
            }
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
    ): Promise<CreateCharacterResultsType> {
        const character = await this.prisma.character.create({
            data: args,
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true,
                        studios: true,
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
    ): Promise<UpdateCharacterResultsType> {
        const character = await this.prisma.character.update({
            where: { id: args.id },
            data: args,
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true,
                        studios: true,
                    },
                },
            },
        });
        return {
            success: true,
            character: character as any,
        };
    }

    async deleteCharacter(
        id: string,
    ): Promise<DeleteCharacterResultsType> {
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
            },
        });
        return {
            success: true,
            character: character as any,
        };
    }
}
