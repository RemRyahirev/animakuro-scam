import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateCharacterInputType } from '../models/inputs/create-character-input.type';
import {
    CharacterMutationType,
    CharacterRootResolver,
} from './character-root.resolver';
import { CreateCharacterResultsType } from '../models/results/create-character-results.type';
import { UpdateCharacterResultsType } from '../models/results/update-character-results.type';
import { UpdateCharacterInputType } from '../models/inputs/update-character-input.type';
import { DeleteCharacterResultsType } from '../models/results/delete-character-results.type';
import { CharacterService } from '../services/character.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMiddleware } from '../../../common/middlewares/auth.middleware';
import { AccessToken } from "common/decorators";

@UseGuards(JwtAuthGuard)
@Resolver(CharacterMutationType)
export class CharacterMutationResolver extends CharacterRootResolver {
    constructor(private characterService: CharacterService) {
        super();
    }

    @ResolveField(() => CreateCharacterResultsType, {
        middleware: [AuthMiddleware],
    })
    async createCharacter(
        @Args() args: CreateCharacterInputType,
        @AccessToken() user_id: string,
    ): Promise<CreateCharacterResultsType> {
        return await this.characterService.createCharacter(args, user_id);
    }

    @ResolveField(() => UpdateCharacterResultsType, {
        middleware: [AuthMiddleware],
    })
    async updateCharacter(
        @Args() args: UpdateCharacterInputType,
        @AccessToken() user_id: string,
    ): Promise<UpdateCharacterResultsType> {
        return await this.characterService.updateCharacter(args, user_id);
    }

    @ResolveField(() => DeleteCharacterResultsType, {
        middleware: [AuthMiddleware],
    })
    async deleteCharacter(
        @Args('id') id: string,
    ): Promise<DeleteCharacterResultsType> {
        return await this.characterService.deleteCharacter(id);
    }
}
