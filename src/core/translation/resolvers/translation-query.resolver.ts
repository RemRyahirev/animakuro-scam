import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import {
    TranslationQueryType,
    TranslationRootResolver,
} from './translation-root.resolver';
import { GetListTranslationResultsType } from '../models/results/get-list-translation-results.type';
import { GetTranslationResultsType } from '../models/results/get-translation-results.type';
import { TranslationService } from '../services/translation.service';

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
        @Args() args: PaginationInputType,
    ): Promise<GetListTranslationResultsType> {
        return await this.translationService.getTranslationList(args);
    }
}
