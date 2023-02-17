import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType, PaginationResultsType } from '@app/common/models/results';

import { OpeningEnding } from '../opening-ending.model';

@ObjectType()
export class GetOpeningEndingListResultsType extends BaseResultsType {
    @Field(() => [OpeningEnding], {
        description: 'Opening/ending list'
    })
    opening_ending_list: OpeningEnding[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
