import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateCharacterInputType } from '../models/inputs/create-character-input.type';
import {
    CharacterMutationType,
    CharacterRootResolver,
} from './character-root.resolver';
import { CreateCharacterResultsType } from '../models/results/create-character-results.type';
import { ICustomContext } from '../../../common/models/interfaces';
import { UpdateCharacterResultsType } from '../models/results/update-character-results.type';
import { UpdateCharacterInputType } from '../models/inputs/update-character-input.type';
import { DeleteCharacterResultsType } from '../models/results/delete-character-results.type';
import { CharacterService } from '../services/character.service';

@Resolver(CharacterMutationType)
export class CharacterMutationResolver extends CharacterRootResolver {
    constructor(private characterService: CharacterService) {
        super();
    }

    @ResolveField(() => CreateCharacterResultsType)
    async createCharacter(
        @Args() args: CreateCharacterInputType,
        @Context() ctx: ICustomContext,
    ): Promise<CreateCharacterResultsType> {
        return await this.characterService.createCharacter(args, ctx);
    }

    @ResolveField(() => UpdateCharacterResultsType)
    async updateCharacter(
        @Args() args: UpdateCharacterInputType,
        @Context() ctx: ICustomContext,
    ): Promise<UpdateCharacterResultsType> {
        return await this.characterService.updateCharacter(args, ctx);
    }

    @ResolveField(() => DeleteCharacterResultsType)
    async deleteCharacter(
        @Args('id') id: string,
        @Context() ctx: ICustomContext,
    ): Promise<DeleteCharacterResultsType> {
        return await this.characterService.deleteCharacter(id, ctx);
    }
}
