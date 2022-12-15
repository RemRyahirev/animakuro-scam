import { IsInt, IsPositive } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationInputType {
    @IsInt()
    @IsPositive()
    @Field(() => Int, { nullable: false })
    page: number;

    @IsInt()
    @IsPositive()
    @Field(() => Int, { nullable: false })
    perPage: number;
}
