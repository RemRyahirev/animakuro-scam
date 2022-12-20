import { Arg, Args, FieldResolver, Resolver } from 'type-graphql';
import { PaginationInputType } from '../../../common/models/inputs';
import {
    TranslationQueryType,
    TranslationRootResolver,
} from './translation-root.resolver';
import { GetListTranslationResultsType } from '../models/results/get-list-translation-results.type';
import { GetTranslationResultsType } from '../models/results/get-translation-results.type';

@Resolver(TranslationQueryType)
export class TranslationQueryResolver extends TranslationRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => GetTranslationResultsType)
    async getTranslation(
        @Arg('id') id: string,
    ): Promise<GetTranslationResultsType> {
        return await this.translationService.getTranslation(id);
    }

    @FieldResolver(() => GetListTranslationResultsType)
    async getTranslationList(
        @Args() args: PaginationInputType,
    ): Promise<GetListTranslationResultsType> {
        return await this.translationService.getTranslationList(args);
    }
}
