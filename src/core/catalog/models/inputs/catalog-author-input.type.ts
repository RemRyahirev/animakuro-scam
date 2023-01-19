import { ArgsType, Field, Int } from '@nestjs/graphql';
import { CatalogBasicInputType } from './catalog-basic-input.type';
import { IsInt, IsOptional, IsString, IsArray } from '@nestjs/class-validator';
import { CatalogAuthorSortField } from '../enums/catalog-author-sort-field.enum';

@ArgsType()
export class CatalogAuthorInputType extends CatalogBasicInputType {
    @IsOptional()
    @IsString()
    @Field(() => CatalogAuthorSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: CatalogAuthorSortField;

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
    @IsArray()
    @Field(() => [String], {
        nullable: true,
        description:
            '[startYear, endYear] (If the 2nd value is not present author is still active)',
    })
    years_active?: string[];

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
