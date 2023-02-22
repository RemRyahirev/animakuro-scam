import { Args, Info, ResolveField, Resolver } from '@nestjs/graphql';
import {
    CharacterQueryType,
    CharacterRootResolver,
} from './character-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListCharacterResultsType } from '../models/results/get-list-character-results.type';
import { GetListCharacterByAnimeIdResultsType } from '../models/results/get-list-character-by-anime-id-results.type';
import { GetCharacterResultsType } from '../models/results/get-character-results.type';
import { CharacterService } from '../services/character.service';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
import { AccessToken } from '../../../common/decorators';
import { fieldsMap } from 'graphql-fields-list';

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
        @Info() info: any,
    ): Promise<GetCharacterResultsType> {
        return await this.characterService.getCharacter(
            id,
            userId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListCharacterResultsType, {
        middleware: [AuthMiddleware],
    })
    async getCharacterList(
        @Args() args: PaginationInputType,
        @AccessToken() userId: string,
        @Info() info: any,
    ): Promise<GetListCharacterResultsType> {
        return await this.characterService.getCharacterList(
            args,
            userId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }

    @ResolveField(() => GetListCharacterByAnimeIdResultsType, {
        middleware: [AuthMiddleware],
    })
    async getCharacterListByAnimeId(
        @Args('id') id: string,
        @Args() args: PaginationInputType,
        @Info() info: any,
        @AccessToken() userId: string,
    ): Promise<GetListCharacterResultsType> {
        return await this.characterService.getCharacterListByAnimeId(
            id,
            args,
            userId,
            JSON.stringify(fieldsMap(info)).includes('is_favourite'),
        );
    }
}
