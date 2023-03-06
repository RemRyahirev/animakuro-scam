import { GraphQLUpload, FileUpload } from 'graphql-upload';
import {
    IsArray,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';
import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateAuthorArgsType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    @Field(() => String, { nullable: true })
    name?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    bio?: string;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    cover?: Promise<FileUpload>;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    date_of_birth?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    date_of_death?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    home_town?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    blood_type?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    language?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    gender?: string;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    age?: number;

    @IsOptional()
    @IsArray()
    @Field(() => [String], { nullable: true })
    primary_occupations?: string[];

    @IsOptional()
    @IsArray()
    @Field(() => [String], { nullable: true })
    years_active?: string[];

    @IsOptional()
    @IsArray()
    @Field(() => [String], { nullable: true })
    synonyms?: string[];
}
