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
        this.coverFiles = this.fileUpload.getStorageForOne('character', 'cover_id', 'characters');
    }

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
        const pagination = await this.paginationService.getPagination(
            'character',
            args,
        );
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
    ): Promise<GetListCharacterByAnimeIdResultsType> {
        const characterList = await this.prisma.character.findMany({
            ...transformPaginationUtil(args),
            where: {
                animes: {
                    some: {
                        id,
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
                cover: await this.coverFiles.tryUpdate({ id: args.id }, args.cover, undefined, user_id),
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

    async deleteCharacter(
        id: string,
    ): Promise<DeleteCharacterResultsType> {
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
