import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import {
    CharacterQueryType,
    CharacterRootResolver,
} from './character-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListCharacterResultsType } from '../models/results/get-list-character-results.type';
import { GetListCharacterByAnimeIdResultsType } from '../models/results/get-list-character-by-anime-id-results.type';
import { GetCharacterResultsType } from '../models/results/get-character-results.type';

@Resolver(CharacterQueryType)
export class CharacterQueryResolver extends CharacterRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetCharacterResultsType)
    async getCharacter(
        @Arg('id') id: string,
    ): Promise<GetCharacterResultsType> {
        return await this.characterService.getCharacter(id);
    }

    @FieldResolver(() => GetListCharacterResultsType)
    async getCharacterList(
        @Args() args: PaginationInputType,
    ): Promise<GetListCharacterResultsType> {
        return await this.characterService.getCharacterList(args);
    }

    @FieldResolver(() => GetListCharacterByAnimeIdResultsType)
    async getCharacterListByAnimeId(
        @Arg('id') id: string,
        @Args() args: PaginationInputType,
    ): Promise<GetListCharacterResultsType> {
        return await this.characterService.getCharacterListByAnimeId(id, args);
    }
}
