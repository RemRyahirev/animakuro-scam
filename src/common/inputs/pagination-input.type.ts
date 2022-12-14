import { IsOptional, Max } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationInputType {
    @Max(50)
    @IsOptional()
    @Field(() => Int, { nullable: true })
    skip?: number;

    @Max(50)
    @IsOptional()
    @Field(() => Int, { nullable: true, defaultValue: 10 })
    take?: number;

    @IsOptional()
    @Field(() => String, { nullable: true })
    orderBy?: string;
}
