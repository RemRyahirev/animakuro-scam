import {
    IsInt,
    IsOptional,
    IsString,
    IsArray,
    IsEnum,
} from '@nestjs/class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

import { CatalogAuthorSortField } from '../enums/catalog-author-sort-field.enum';
import { CatalogAuthorSearchTable } from '../enums/catalog-author-search-table.enum';

import { CatalogBasicArgsType } from './catalog-basic-args.type';

@ArgsType()
export class CatalogAuthorArgsType extends CatalogBasicArgsType {
    @IsOptional()
    @IsString()
    @Field(() => CatalogAuthorSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: CatalogAuthorSortField;

    @IsOptional()
    @IsEnum(CatalogAuthorSearchTable)
    @Field(() => CatalogAuthorSearchTable, {
        nullable: true,
        description: 'Which table to search',
        defaultValue: CatalogAuthorSearchTable.AUTHORS,
    })
    search_table?: CatalogAuthorSearchTable;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true, description: `Minimal Author's age` })
    min_age?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true, description: `Maximum Author's age` })
    max_age?: number;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: `The author's birth date`,
    })
    date_of_birth?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: `The author's death date`,
    })
    date_of_death?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: 'The author birthplace or hometown',
    })
    home_town?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: `The author's blood type`,
    })
    blood_type?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: `The primary language of the author`,
    })
    language?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: `The author's gender. Usually Male, Female, or Non-binary.`,
    })
    gender?: string;
}
