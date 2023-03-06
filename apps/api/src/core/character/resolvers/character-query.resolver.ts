import { fieldsMap } from 'graphql-fields-list';
import { Args, Info, ResolveField, Resolver } from '@nestjs/graphql';

import { ProfileId } from '@app/common/decorators';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { PaginationArgsType } from '@app/common/models/inputs';

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
        @ProfileId() profileId: string,
        @Info() info: any,
    ): Promise<GetCharacterResultsType> {
        return await this.characterService.getCharacter(
            id,
            profileId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListCharacterResultsType, {
        middleware: [AuthMiddleware],
    })
    async getCharacterList(
        @Args() args: PaginationArgsType,
        @ProfileId() profileId: string,
        @Info() info: any,
    ): Promise<GetListCharacterResultsType> {
        return await this.characterService.getCharacterList(
            args,
            profileId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListCharacterByAnimeIdResultsType, {
        middleware: [AuthMiddleware],
    })
    async getCharacterListByAnimeId(
        @Args('id') id: string,
        @Args() args: PaginationArgsType,
        @Info() info: any,
        @ProfileId() profileId: string,
    ): Promise<GetListCharacterResultsType> {
        return await this.characterService.getCharacterListByAnimeId(
            id,
            args,
            profileId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }
}
