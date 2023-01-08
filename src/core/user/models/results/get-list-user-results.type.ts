import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { User } from '../user.model';

@ObjectType()
export class GetListUserResultsType extends BaseResultsType {
    @Field(() => [User], {
        nullable: true,
        description: 'User list',
    })
    userList: User[] | null;

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
