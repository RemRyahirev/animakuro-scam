import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { User } from '../user.model';

@ObjectType()
export class GetListUserByEmailResultsType extends BaseResultsType {
    @Field(() => [User], {
        nullable: true,
        description: 'User list by email',
    })
    userList: User[] | null;

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
