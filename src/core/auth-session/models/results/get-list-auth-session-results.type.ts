import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { AuthSession } from "../auth-session.model";

@ObjectType()
export class GetListAuthSessionResultsType extends BaseResultsType {
    @Field(() => [AuthSession], {
        nullable: true,
        description: 'Auth session list',
    })
    auth_session_list: AuthSession[];
    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
