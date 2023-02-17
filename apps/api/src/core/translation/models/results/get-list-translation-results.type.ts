import { Field, ObjectType } from '@nestjs/graphql';

import {
    BaseResultsType,
    PaginationResultsType,
} from '@app/common/models/results';

import { Translation } from '../translation.model';

@ObjectType()
export class GetListTranslationResultsType extends BaseResultsType {
    @Field(() => [Translation], {
        nullable: true,
        description: 'Translation list',
    })
    translation_list: Translation[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
