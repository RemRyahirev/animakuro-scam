import { IsNumber } from 'class-validator';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { IsArray, IsEnum, IsString, Length, IsOptional } from '@nestjs/class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

import { CharacterRole, CharacterType } from '@app/common/models/enums';

@ArgsType()
export class CreateCharacterInputType {

    @IsString()
    @Length(1, 50)
    @Field(() => String)
    name: string;

    @IsEnum(CharacterType)
    @Field(() => CharacterType, { defaultValue: CharacterType.PROTAGONIST })
    importance: CharacterType;

    @IsString()
    @Field(() => String)
    date_of_birth: string;

    @IsString()
    @Field(() => String)
    gender: string;

    @IsString()
    @Field(() => String)
    blood_type: string;

    @IsNumber()
    @Field(() => Int)
    age: number;

    @IsEnum(CharacterRole)
    @Field(() => CharacterRole, { defaultValue: CharacterRole.MAIN })
    role: CharacterRole;

    @IsString()
    @Field(() => String)
    description: string;

    @IsArray()
    @Field(() => [String])
    synonyms: string[];

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    cover?: Promise<FileUpload>;
}
