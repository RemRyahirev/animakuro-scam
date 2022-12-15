import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Database from '../../../database';
import { CreateCharacterResultsType } from '../models/results/create-character-results.type';
import { CharacterService } from '../services/character.service';
import { UpdateCharacterResultsType } from '../models/results/update-character-results.type';
import { DeleteCharacterResultsType } from '../models/results/delete-character-results.type';
import { GetListCharacterResultsType } from '../models/results/get-list-character-results.type';
import { GetCharacterResultsType } from '../models/results/get-character-results.type';
import { PaginationService } from "../../../common/services";
import { PrismaClient } from '@prisma/client';

@ObjectType()
export class CharacterMutationType {
    @Field(() => CreateCharacterResultsType, { description: 'Create character' })
    createCharacter: CreateCharacterResultsType;

    @Field(() => UpdateCharacterResultsType, { description: 'Update character' })
    updateCharacter: UpdateCharacterResultsType;

    @Field(() => DeleteCharacterResultsType, { description: 'Delete character' })
    deleteCharacter: DeleteCharacterResultsType;
}

@ObjectType()
export class CharacterQueryType {
    @Field(() => GetCharacterResultsType, { description: 'Get character by ID' })
    getCharacter: GetCharacterResultsType;

    @Field(() => GetListCharacterResultsType, { description: 'Get character list' })
    getCharacterList: GetListCharacterResultsType;
}

@Resolver()
export class CharacterRootResolver {
    protected readonly prisma: PrismaClient = Database.getInstance().logic;
    protected readonly characterService: CharacterService = new CharacterService();
    protected readonly paginationService: PaginationService =
        new PaginationService('character');

    @Mutation(() => CharacterMutationType, { description: 'Character mutations' })
    characterMutations() {
        return {};
    }

    @Query(() => CharacterQueryType, { description: 'Character queries' })
    characterQueries() {
        return {};
    }
}
