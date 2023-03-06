import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { PaginationArgsType } from '@app/common/models/inputs';

import { GetListTranslationResultsType } from '../models/results/get-list-translation-results.type';
import { GetTranslationResultsType } from '../models/results/get-translation-results.type';
import { TranslationService } from '../services/translation.service';

import {
    TranslationQueryType,
    TranslationRootResolver,
} from './translation-root.resolver';

@Resolver(TranslationQueryType)
export class TranslationQueryResolver extends TranslationRootResolver {
    constructor(private translationService: TranslationService) {
        super();
    }

    @ResolveField(() => GetTranslationResultsType)
    async getTranslation(
        @Args('id') id: string,
    ): Promise<GetTranslationResultsType> {
        return await this.translationService.getTranslation(id);
    }

    @ResolveField(() => GetListTranslationResultsType)
    async getTranslationList(
        @Args() args: PaginationArgsType,
    ): Promise<GetListTranslationResultsType> {
        return await this.translationService.getTranslationList(args);
    }
}
