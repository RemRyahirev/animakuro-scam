import { GraphQLUpload, FileUpload } from 'graphql-upload';
import {
    IsArray,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';
import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

import { CharacterRole, CharacterType } from '@app/common/models/enums';

@ArgsType()
export class UpdateCharacterArgsType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    @Field(() => String, { nullable: true })
    name?: string;

    @IsOptional()
    @IsEnum(CharacterType)
    @Field(() => CharacterType, {
        nullable: true,
        defaultValue: CharacterType.PROTAGONIST,
    })
    importance?: CharacterType;

    @IsOptional()
    @IsEnum(CharacterRole)
    @Field(() => CharacterRole, {
        nullable: true,
        defaultValue: CharacterRole.MAIN,
    })
    role?: CharacterRole;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    description?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    date_of_birth?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    gender?: string;

    @IsOptional()
    @IsNumber()
    @Field(() => Int, { nullable: true })
    age?: number;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    blood_type?: string;

    @IsOptional()
    @IsArray()
    @Field(() => [String], { nullable: true })
    synonyms?: string[];

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    cover?: Promise<FileUpload>;
}
