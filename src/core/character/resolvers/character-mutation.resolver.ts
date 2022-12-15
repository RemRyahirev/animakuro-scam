import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { CreateCharacterInputType } from '../models/inputs/create-character-input.type';
import { CharacterMutationType, CharacterRootResolver } from './character-root.resolver';
import { CreateCharacterResultsType } from '../models/results/create-character-results.type';
import { ICustomContext } from '../../../common/models/interfaces';
import { UpdateCharacterResultsType } from '../models/results/update-character-results.type';
import { UpdateCharacterInputType } from '../models/inputs/update-character-input.type';
import { DeleteCharacterResultsType } from '../models/results/delete-character-results.type';

@Resolver(CharacterMutationType)
export class CharacterMutationResolver extends CharacterRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => CreateCharacterResultsType)
    async createCharacter(
        @Args() args: CreateCharacterInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<CreateCharacterResultsType> {
        const character = await this.characterService.createCharacter(args);
        return {
            success: true,
            character,
        };
    }

    @FieldResolver(() => UpdateCharacterResultsType)
    async updateCharacter(
        @Args() args: UpdateCharacterInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<UpdateCharacterResultsType> {
        const character = await this.characterService.updateCharacter(args);
        return {
            success: true,
            character,
        };
    }

    @FieldResolver(() => DeleteCharacterResultsType)
    async deleteCharacter(
        @Arg('id') id: string,
        @Ctx() ctx: ICustomContext,
    ): Promise<DeleteCharacterResultsType> {
        const character = await this.characterService.deleteCharacter(id);
        return {
            success: true,
            character,
        };
    }
}
