import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Studio } from '../studio.model';

@ObjectType()
export class GetListStudioResultsType extends BaseResultsType {
    @Field(() => [Studio], {
        nullable: true,
        description: 'Studio list',
    })
    studioList: Studio[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
