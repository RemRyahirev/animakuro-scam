import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    CharacterQueryType,
    CharacterRootResolver,
} from './character-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListCharacterResultsType } from '../models/results/get-list-character-results.type';
import { GetListCharacterByAnimeIdResultsType } from '../models/results/get-list-character-by-anime-id-results.type';
import { GetCharacterResultsType } from '../models/results/get-character-results.type';
import { CharacterService } from '../services/character.service';

@Resolver(CharacterQueryType)
export class CharacterQueryResolver extends CharacterRootResolver {
    constructor(private characterService: CharacterService) {
        super();
    }

    @ResolveField(() => GetCharacterResultsType)
    async getCharacter(
        @Args("id") id: string
    ): Promise<GetCharacterResultsType> {
        return await this.characterService.getCharacter(id);
    }

    @ResolveField(() => GetListCharacterResultsType)
    async getCharacterList(
        @Args() args: PaginationInputType,
    ): Promise<GetListCharacterResultsType> {
        return await this.characterService.getCharacterList(args);
    }

    @ResolveField(() => GetListCharacterByAnimeIdResultsType)
    async getCharacterListByAnimeId(
        @Args("id") id: string,
        @Args() args: PaginationInputType
    ): Promise<GetListCharacterResultsType> {
        return await this.characterService.getCharacterListByAnimeId(id, args);
    }
}
