import { Field, ObjectType } from '@nestjs/graphql';

import {
    BaseResultsType,
    PaginationResultsType,
} from '@app/common/models/results';

import { UserCollection } from '../user-collection.model';

@ObjectType()
export class GetListUserCollectionResultsType extends BaseResultsType {
    @Field(() => [UserCollection], {
        nullable: true,
        description: 'User Collection list',
    })
    userCollectionList: UserCollection[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
