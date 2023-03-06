import { Field, ObjectType } from '@nestjs/graphql';

import {
    BaseResultsType,
    PaginationResultsType,
} from '@app/common/models/results';

import { User } from '../user.model';

@ObjectType()
export class GetListUserResultsType extends BaseResultsType {
    @Field(() => [User], {
        nullable: true,
        description: 'User list',
    })
    userList?: User[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
