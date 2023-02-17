import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationInputType } from '@app/common/models/inputs';

import { GetListCharacterResultsType } from '../models/results/get-list-character-results.type';
import { GetListCharacterByAnimeIdResultsType } from '../models/results/get-list-character-by-anime-id-results.type';
import { GetCharacterResultsType } from '../models/results/get-character-results.type';
import { CharacterService } from '../services/character.service';

import {
    CharacterQueryType,
    CharacterRootResolver,
} from './character-root.resolver';

@Resolver(CharacterQueryType)
export class CharacterQueryResolver extends CharacterRootResolver {
    constructor(private characterService: CharacterService) {
        super();
    }

    @ResolveField(() => GetCharacterResultsType, {
        middleware: [AuthMiddleware],
    })
    async getCharacter(
        @Args('id') id: string,
        @AccessToken() userId: string,
    ): Promise<GetCharacterResultsType> {
        return await this.characterService.getCharacter(id, userId);
    }

    @ResolveField(() => GetListCharacterResultsType, {
        middleware: [AuthMiddleware],
    })
    async getCharacterList(
        @Args() args: PaginationInputType,
        @AccessToken() userId: string,
    ): Promise<GetListCharacterResultsType> {
        return await this.characterService.getCharacterList(args, userId);
    }

    @ResolveField(() => GetListCharacterByAnimeIdResultsType, {
        middleware: [AuthMiddleware],
    })
    async getCharacterListByAnimeId(
        @Args('id') id: string,
        @Args() args: PaginationInputType,
        @AccessToken() userId: string,
    ): Promise<GetListCharacterResultsType> {
        return await this.characterService.getCharacterListByAnimeId(id, args, userId);
    }
}
