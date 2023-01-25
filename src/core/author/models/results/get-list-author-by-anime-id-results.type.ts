import { Field, ObjectType } from '@nestjs/graphql';
import {
    BaseResultsType,
    PaginationResultsType,
} from '../../../../common/models/results';
import { Author } from '../author.model';

@ObjectType()
export class GetListAuthorByAnimeIdResultsType extends BaseResultsType {
    @Field(() => [Author], {
        nullable: true,
        description: 'Author list',
    })
    author_list: Author[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
