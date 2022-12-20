import { Field, ObjectType } from 'type-graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Translation } from '../translation.model';

@ObjectType()
export class GetListTranslationResultsType extends BaseResultsType {
    @Field(() => [Translation], {
        nullable: true,
        description: 'Translation list',
    })
    translationList: Translation[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
