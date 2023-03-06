import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import { CreateCharacterArgsType } from '../models/inputs/create-character-args.type';
import { CreateCharacterResultsType } from '../models/results/create-character-results.type';
import { UpdateCharacterResultsType } from '../models/results/update-character-results.type';
import { UpdateCharacterArgsType } from '../models/inputs/update-character-args.type';
import { DeleteCharacterResultsType } from '../models/results/delete-character-results.type';
import { CharacterService } from '../services/character.service';

import {
    CharacterMutationType,
    CharacterRootResolver,
} from './character-root.resolver';

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
        @Args() args: CreateCharacterArgsType,
        @AccessToken() user_id: string,
    ): Promise<CreateCharacterResultsType> {
        return await this.characterService.createCharacter(args, user_id);
    }

    @ResolveField(() => UpdateCharacterResultsType, {
        middleware: [AuthMiddleware],
    })
    async updateCharacter(
        @Args() args: UpdateCharacterArgsType,
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
