import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
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

@Resolver(TranslationMutationType)
export class TranslationMutationResolver extends TranslationRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => CreateTranslationResultsType)
    async createTranslation(
        @Args() args: CreateTranslationInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<CreateTranslationResultsType> {
        return await this.translationService.createTranslation(args, ctx);
    }

    @FieldResolver(() => UpdateTranslationResultsType)
    async updateTranslation(
        @Args() args: UpdateTranslationInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<UpdateTranslationResultsType> {
        return await this.translationService.updateTranslation(args, ctx);
    }

    @FieldResolver(() => DeleteTranslationResultsType)
    async deleteTranslation(
        @Arg('id') id: string,
        @Ctx() ctx: ICustomContext,
    ): Promise<DeleteTranslationResultsType> {
        return await this.translationService.deleteTranslation(id, ctx);
    }
}
