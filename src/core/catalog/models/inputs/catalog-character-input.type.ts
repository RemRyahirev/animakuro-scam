import { ArgsType, Field } from '@nestjs/graphql';
import { CatalogBasicInputType } from './catalog-basic-input.type';
import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { CharacterRole, CharacterType } from '../../../../common/models/enums';
import { CatalogCharacterSortField } from '../enums/catalog-character-sort-field.enum';
import { CatalogCharacterSearchTable } from '../enums/catalog-character-search-table.enum';

@ArgsType()
export class CatalogCharacterInputType extends CatalogBasicInputType {
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
        defaultValue: CatalogCharacterSearchTable.CHARACTERS
    })
    search_table?: CatalogCharacterSearchTable;

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
