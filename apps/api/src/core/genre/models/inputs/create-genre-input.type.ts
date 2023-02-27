import { IsOptional, IsString, Length } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateGenreInputType {
    @IsString()
    @Length(1, 50)
    @Field(() => String)
    name: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    description?: string | null;
}
