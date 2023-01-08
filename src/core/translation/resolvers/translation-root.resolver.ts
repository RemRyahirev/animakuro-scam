import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateTranslationResultsType } from '../models/results/create-translation-results.type';
import { GetListTranslationResultsType } from '../models/results/get-list-translation-results.type';
import { DeleteTranslationResultsType } from '../models/results/delete-translation-results.type';
import { GetTranslationResultsType } from '../models/results/get-translation-results.type';
import { UpdateTranslationResultsType } from '../models/results/update-translation-results.type';

@ObjectType()
export class TranslationMutationType {
    @Field(() => CreateTranslationResultsType, {
        description: 'Create translation',
    })
    createTranslation: CreateTranslationResultsType;

    @Field(() => UpdateTranslationResultsType, {
        description: 'Update translation',
    })
    updateTranslation: UpdateTranslationResultsType;

    @Field(() => DeleteTranslationResultsType, {
        description: 'Delete translation',
    })
    deleteTranslation: DeleteTranslationResultsType;
}

@ObjectType()
export class TranslationQueryType {
    @Field(() => GetTranslationResultsType, {
        description: 'Get translation by ID',
    })
    getTranslation: GetTranslationResultsType;

    @Field(() => GetListTranslationResultsType, {
        description: 'Get translation list',
    })
    getTranslationList: GetListTranslationResultsType;
}

@Resolver()
export class TranslationRootResolver {
    @Mutation(() => TranslationMutationType, {
        description: 'Translation mutations',
    })
    translationMutations() {
        return {};
    }

    @Query(() => TranslationQueryType, { description: 'Translation queries' })
    translationQueries() {
        return {};
    }
}
