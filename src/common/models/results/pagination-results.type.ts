import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class PaginationResultsType {
    @Field(() => Int, {
        nullable: false,
        description: 'Page number',
    })
    page: number;

    @Field(() => Int, {
        nullable: false,
        description: 'Entities on page',
    })
    perPage: number;

    @Field(() => Int, {
        nullable: false,
        description: 'Total page count',
    })
    pageCount: number;

    @Field(() => Int, {
        nullable: false,
        description: 'Total entities count',
    })
    totalCount: number;
}
