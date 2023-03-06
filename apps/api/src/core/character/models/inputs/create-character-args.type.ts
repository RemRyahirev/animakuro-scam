import { IsNumber } from 'class-validator';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { IsArray, IsEnum, IsString, Length, IsOptional } from '@nestjs/class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

import { CharacterRole, CharacterType } from '@app/common/models/enums';

@ArgsType()
export class CreateCharacterArgsType {
    @IsString()
    @Length(1, 50)
    name: string;

    @IsEnum(CharacterType)
    @Field(() => CharacterType, {
        defaultValue: CharacterType.PROTAGONIST,
    })
    importance: CharacterType;

    @IsString()
    date_of_birth: string;

    @IsString()
    gender: string;

    @IsString()
    blood_type: string;

    @IsNumber()
    @Field(() => Int)
    age: number;

    @IsEnum(CharacterRole)
    @Field(() => CharacterRole, {
        defaultValue: CharacterRole.MAIN,
    })
    role: CharacterRole;

    @IsString()
    description: string;

    @IsArray()
    synonyms: string[];

    @IsOptional()
    @Field(() => GraphQLUpload)
    cover?: Promise<FileUpload>;
}
