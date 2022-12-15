import Database from '../../../database';
import { CreateCharacterInputType } from '../models/inputs/create-character-input.type';
import { UpdateCharacterInputType } from '../models/inputs/update-character-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { Character } from '../models/character.model';

export class CharacterService {
    private readonly prisma = Database.getInstance().logic;

    async getCharacter(id: string): Promise<Character | null> {
        return await this.prisma.character.findUnique({
            where: {
                id
            }
        })
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
