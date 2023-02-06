import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, Length } from '@nestjs/class-validator';

@ArgsType()
export class CreateGenreInputType {
    @IsString()
    @Length(1, 50)
    @Field(() => String)
    name: string;

    @Field(() => String, { nullable: true })
    description?: string | null;
}
