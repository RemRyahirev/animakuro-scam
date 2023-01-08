import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateCharacterResultsType } from '../models/results/create-character-results.type';
import { UpdateCharacterResultsType } from '../models/results/update-character-results.type';
import { DeleteCharacterResultsType } from '../models/results/delete-character-results.type';
import { GetListCharacterResultsType } from '../models/results/get-list-character-results.type';
import { GetListCharacterByAnimeIdResultsType } from '../models/results/get-list-character-by-anime-id-results.type';
import { GetCharacterResultsType } from '../models/results/get-character-results.type';

@ObjectType()
export class CharacterMutationType {
    @Field(() => CreateCharacterResultsType, {
        description: 'Create character',
    })
    createCharacter: CreateCharacterResultsType;

    @Field(() => UpdateCharacterResultsType, {
        description: 'Update character',
    })
    updateCharacter: UpdateCharacterResultsType;

    @Field(() => DeleteCharacterResultsType, {
        description: 'Delete character',
    })
    deleteCharacter: DeleteCharacterResultsType;
}

@ObjectType()
export class CharacterQueryType {
    @Field(() => GetCharacterResultsType, {
        description: 'Get character by ID',
    })
    getCharacter: GetCharacterResultsType;

    @Field(() => GetListCharacterResultsType, {
        description: 'Get character list',
    })
    getCharacterList: GetListCharacterResultsType;

    @Field(() => GetListCharacterByAnimeIdResultsType, {
        description: 'Get character list by anime ID',
    })
    getCharacterListByAnimeId: GetListCharacterByAnimeIdResultsType;
}

@Resolver()
export class CharacterRootResolver {
    @Mutation(() => CharacterMutationType, {
        description: 'Character mutations',
    })
    characterMutations() {
        return {};
    }

    @Query(() => CharacterQueryType, { description: 'Character queries' })
    characterQueries() {
        return {};
    }
}
