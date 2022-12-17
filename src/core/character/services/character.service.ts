import { Database } from '../../../loaders';
import { CreateCharacterInputType } from '../models/inputs/create-character-input.type';
import { UpdateCharacterInputType } from '../models/inputs/update-character-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { Character } from '../models/character.model';
import { PaginationService } from '../../../common/services';
import { ICustomContext } from '../../../common/models/interfaces';

export class CharacterService {
    private readonly prisma = new Database().logic;
    private readonly paginationService: PaginationService =
        new PaginationService('character');

    async getCharacterInfo(id: string) {
        const character = await this.getCharacter(id);
        if (!character) {
            return {
                success: false,
                character: null,
                errors: ['Character not found'],
            };
        }
        return {
            success: true,
            character,
            errors: [],
        };
    }

    async getCharacterListInfo(args: PaginationInputType) {
        const characterList = await this.getCharacterList(args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            characterList,
            pagination,
        };
    }

    async createCharacterInfo(
        args: CreateCharacterInputType,
        ctx: ICustomContext,
    ) {
        const character = await this.createCharacter(args);
        return {
            success: true,
            character,
        };
    }

    async updateCharacterInfo(
        args: UpdateCharacterInputType,
        ctx: ICustomContext,
    ) {
        const character = await this.updateCharacter(args);
        return {
            success: true,
            character,
        };
    }

    async deleteCharacterInfo(id: string, ctx: ICustomContext) {
        const character = await this.deleteCharacter(id);
        return {
            success: true,
            character,
        };
    }

    async getCharacter(id: string): Promise<Character | null> {
        return await this.prisma.character.findUnique({
            where: {
                id,
            },
        });
    }

    async getCharacterList(args: PaginationInputType): Promise<Character[]> {
        return await this.prisma.character.findMany({
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
        });
    }

    async createCharacter(args: CreateCharacterInputType): Promise<Character> {
        return await this.prisma.character.create({
            data: args,
        });
    }

    async updateCharacter(args: UpdateCharacterInputType): Promise<Character> {
        return await this.prisma.character.update({
            where: { id: args.id },
            data: args,
        });
    }

    async deleteCharacter(id: string) {
        return await this.prisma.character.delete({
            where: { id },
        });
    }
}
