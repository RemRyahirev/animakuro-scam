import { IsEnum, IsInt, IsOptional, IsString } from '@nestjs/class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

import { CharacterRole, CharacterType } from '@app/common/models/enums';

import { CatalogCharacterSortField } from '../enums/catalog-character-sort-field.enum';
import { CatalogCharacterSearchTable } from '../enums/catalog-character-search-table.enum';

import { CatalogBasicArgsType } from './catalog-basic-args.type';

@ArgsType()
export class CatalogCharacterArgsType extends CatalogBasicArgsType {
    @IsOptional()
    @IsEnum(CatalogCharacterSortField)
    @Field(() => CatalogCharacterSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: CatalogCharacterSortField;

    @IsOptional()
    @IsEnum(CatalogCharacterSearchTable)
    @Field(() => CatalogCharacterSearchTable, {
        nullable: true,
        description: 'Which table to search',
        defaultValue: CatalogCharacterSearchTable.CHARACTERS,
    })
    search_table?: CatalogCharacterSearchTable;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: `Minimal Character's age`,
    })
    min_age?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: `Maximum Character's age`,
    })
    max_age?: number;

    @IsOptional()
    @IsEnum(CharacterType)
    @Field(() => CharacterType, {
        nullable: true,
        description: 'Type of the character',
    })
    importance?: CharacterType;

    @IsOptional()
    @IsEnum(CharacterRole)
    @Field(() => CharacterRole, {
        nullable: true,
        description: 'Role of the character',
    })
    role?: CharacterRole;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: `The character's blood type`,
    })
    blood_type?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: `The character's gender. Usually Male, Female, or Non-binary.`,
    })
    gender?: string;
}
