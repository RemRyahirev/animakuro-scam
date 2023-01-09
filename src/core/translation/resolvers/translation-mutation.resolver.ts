import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { ICustomContext } from '../../../common/models/interfaces';
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
        @Context() ctx: ICustomContext,
    ): Promise<CreateTranslationResultsType> {
        return await this.translationService.createTranslation(args, ctx);
    }

    @ResolveField(() => UpdateTranslationResultsType)
    async updateTranslation(
        @Args() args: UpdateTranslationInputType,
        @Context() ctx: ICustomContext,
    ): Promise<UpdateTranslationResultsType> {
        return await this.translationService.updateTranslation(args, ctx);
    }

    @ResolveField(() => DeleteTranslationResultsType)
    async deleteTranslation(
        @Args('id') id: string,
        @Context() ctx: ICustomContext,
    ): Promise<DeleteTranslationResultsType> {
        return await this.translationService.deleteTranslation(id, ctx);
    }
}
