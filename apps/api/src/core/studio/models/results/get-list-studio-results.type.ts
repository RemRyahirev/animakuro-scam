import { Field, ObjectType } from '@nestjs/graphql';

import {
    BaseResultsType,
    PaginationResultsType,
} from '@app/common/models/results';

import { Studio } from '../studio.model';

@ObjectType()
export class GetListStudioResultsType extends BaseResultsType {
    @Field(() => [Studio], {
        nullable: true,
        description: 'Studio list',
    })
    studio_list: Studio[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
