import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { DeleteTranslationResultsType } from '../models/results/delete-translation-results.type';
import { CreateTranslationResultsType } from '../models/results/create-translation-results.type';
import { CreateTranslationArgsType } from '../models/inputs/create-translation-args.type';
import { UpdateTranslationResultsType } from '../models/results/update-translation-results.type';
import { UpdateTranslationArgsType } from '../models/inputs/update-translation-args.type';
import { TranslationService } from '../services/translation.service';

import {
    TranslationMutationType,
    TranslationRootResolver,
} from './translation-root.resolver';

@Resolver(TranslationMutationType)
export class TranslationMutationResolver extends TranslationRootResolver {
    constructor(private translationService: TranslationService) {
        super();
    }

    @ResolveField(() => CreateTranslationResultsType)
    async createTranslation(
        @Args() args: CreateTranslationArgsType,
    ): Promise<CreateTranslationResultsType> {
        return await this.translationService.createTranslation(args);
    }

    @ResolveField(() => UpdateTranslationResultsType)
    async updateTranslation(
        @Args() args: UpdateTranslationArgsType,
    ): Promise<UpdateTranslationResultsType> {
        return await this.translationService.updateTranslation(args);
    }

    @ResolveField(() => DeleteTranslationResultsType)
    async deleteTranslation(
        @Args('id') id: string,
    ): Promise<DeleteTranslationResultsType> {
        return await this.translationService.deleteTranslation(id);
    }
}
