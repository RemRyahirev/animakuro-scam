import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from '@nestjs/class-validator';

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
