import { ArgsType, Field, ID } from '@nestjs/graphql';
import {
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';
import { CharacterRole, CharacterType } from '../../../../common/models/enums';

@ArgsType()
export class UpdateCharacterInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    bucket_id?: string;

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
    @IsString()
    @Field(() => String, { nullable: true })
    blood_type?: string;

    @IsOptional()
    @IsArray()
    @Field(() => [String], { nullable: true })
    synonyms?: string[];
}
