import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { CharacterQueryType, CharacterRootResolver } from './character-root.resolver';
import { PaginationInputType } from '../../../common/models/inputs';
import { GetListCharacterResultsType } from '../models/results/get-list-character-results.type';
import { GetCharacterResultsType } from '../models/results/get-character-results.type';

@Resolver(CharacterQueryType)
export class CharacterQueryResolver extends CharacterRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetCharacterResultsType)
    async getCharacter(@Arg('id') id: string): Promise<GetCharacterResultsType> {
        const character = await this.characterService.getCharacter(id);
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

    @FieldResolver(() => GetListCharacterResultsType)
    async getCharacterList(
        @Args() args: PaginationInputType,
    ): Promise<GetListCharacterResultsType> {
        const characterList = await this.characterService.getCharacterList(args);
        const pagination = await this.paginationService.getPagination(args);
        return {
            success: true,
            errors: [],
            characterList,
            pagination,
        };
    }
}
