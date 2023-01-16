import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    TranslationMutationType,
    TranslationRootResolver,
} from './translation-root.resolver';
import { DeleteTranslationResultsType } from '../models/results/delete-translation-results.type';
import { CreateTranslationResultsType } from '../models/results/create-translation-results.type';
import { CreateTranslationInputType } from '../models/inputs/create-translation-input.type';
import { UpdateTranslationResultsType } from '../models/results/update-translation-results.type';
import { UpdateTranslationInputType } from '../models/inputs/update-translation-input.type';
import { TranslationService } from '../services/translation.service';

@Resolver(TranslationMutationType)
export class TranslationMutationResolver extends TranslationRootResolver {
    constructor(private translationService: TranslationService) {
        super();
    }

    @ResolveField(() => CreateTranslationResultsType)
    async createTranslation(
        @Args() args: CreateTranslationInputType,
    ): Promise<CreateTranslationResultsType> {
        return await this.translationService.createTranslation(args);
    }

    @ResolveField(() => UpdateTranslationResultsType)
    async updateTranslation(
        @Args() args: UpdateTranslationInputType,
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
