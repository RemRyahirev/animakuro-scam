import { Field, ObjectType } from 'type-graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Author } from '../author.model';

@ObjectType()
export class GetListAuthorResultsType extends BaseResultsType {
    @Field(() => [Author], {
        nullable: true,
        description: 'Author list',
    })
    authorList: Author[] | null;

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
