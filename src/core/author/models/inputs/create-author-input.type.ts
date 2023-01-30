import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsInt, IsString, Length } from '@nestjs/class-validator';

@ArgsType()
export class CreateAuthorInputType {
    @IsString()
    @Length(1, 50)
    @Field(() => String)
    name: string;

    @IsString()
    @Field(() => String)
    bio: string;

    @IsString()
    @Field(() => String)
    date_of_birth: string;

    @IsString()
    @Field(() => String)
    date_of_death: string;

    @IsString()
    @Field(() => String)
    home_town: string;

    @IsString()
    @Field(() => String)
    blood_type: string;

    @IsString()
    @Field(() => String)
    language: string;

    @IsString()
    @Field(() => String)
    gender: string;

    @IsInt()
    @Field(() => Int)
    age: number;

    @IsArray()
    @Field(() => [String])
    primary_occupations: string[];

    @IsArray()
    @Field(() => [String])
    years_active: string[];

    @IsArray()
    @Field(() => [String])
    synonyms: string[];
}
