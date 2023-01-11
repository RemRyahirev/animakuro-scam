import { CreateCharacterInputType } from '../models/inputs/create-character-input.type';
import { UpdateCharacterInputType } from '../models/inputs/update-character-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { PaginationService } from '../../../common/services/pagination.service';
import { PrismaService } from '../../../common/services/prisma.service';
import { ICustomContext } from '../../../common/models/interfaces';
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

    async getCharacter(id: string): Promise<GetCharacterResultsType> {
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
        return {
            success: true,
            character: character as any,
            errors: [],
        };
    }

    async getCharacterList(
        args: PaginationInputType,
    ): Promise<GetListCharacterResultsType> {
        const characterList = await this.prisma.character.findMany({
            ...transformPaginationUtil(args),
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true
                    }
                }
            }
        });
        const pagination = await this.paginationService.getPagination('character', args);
        return {
            success: true,
            errors: [],
            characterList: characterList as any,
            pagination,
        };
    }

    async getCharacterListByAnimeId(
        id: string,
        args: PaginationInputType,
    ): Promise<GetListCharacterByAnimeIdResultsType> {
        const characterList = await this.prisma.character.findMany({
            ...transformPaginationUtil(args),
            where: {
                animes: {
                    some: {
                        id
                    }
                }
            }
        });
        const pagination = await this.paginationService.getPagination(
            "character",
            args,
            {
                nested_field: "animes",
                search_property: "id",
                search_value: id
            }
        );
        return {
            success: true,
            errors: [],
            characterList: characterList as any,
            pagination
        };
    }

    async createCharacter(
        args: CreateCharacterInputType,
        ctx: ICustomContext,
    ): Promise<CreateCharacterResultsType> {
        const character = await this.prisma.character.create({
            data: args,
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true
                    }
                }
            }
        });
        return {
            success: true,
            character: character as any,
        };
    }

    async updateCharacter(
        args: UpdateCharacterInputType,
        ctx: ICustomContext,
    ): Promise<UpdateCharacterResultsType> {
        const character = await this.prisma.character.update({
            where: { id: args.id },
            data: args,
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true
                    }
                }
            }
        });
        return {
            success: true,
            character: character as any,
        };
    }

    async deleteCharacter(
        id: string,
        ctx: ICustomContext,
    ): Promise<DeleteCharacterResultsType> {
        const character = await this.prisma.character.delete({
            where: { id },
            include: {
                animes: {
                    include: {
                        genres: true,
                        characters: true,
                        authors: true
                    }
                }
            }
        });
        return {
            success: true,
            character: character as any,
        };
    }
}
