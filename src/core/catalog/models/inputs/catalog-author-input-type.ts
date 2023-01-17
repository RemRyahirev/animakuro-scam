import { ArgsType, Field, Int } from '@nestjs/graphql';
import { CatalogBasicInputType } from './catalog-basic-input.type';
import { IsInt, IsOptional, IsString, IsArray } from '@nestjs/class-validator';
import { CatalogAuthorSortField } from "../enums/catalog-author-sort-field.enum";

@ArgsType()
export class CatalogAuthorInputType extends CatalogBasicInputType {
    @IsOptional()
    @IsString()
    @Field(() => CatalogAuthorSortField, { nullable: true })
    sortField?: CatalogAuthorSortField

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    age?: number;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    date_of_birth?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    date_of_death?: string;

    @IsOptional()
    @IsArray()
    @Field(() => [String], { nullable: true })
    years_active?: string[];

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
}
