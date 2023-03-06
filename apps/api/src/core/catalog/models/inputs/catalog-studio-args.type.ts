import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from '@nestjs/class-validator';
import { ArgsType, Field, Float, ID } from '@nestjs/graphql';

import { CatalogStudioSortField } from '../enums/catalog-studio-sort-field.enum';

import { CatalogBasicArgsType } from './catalog-basic-args.type';

@ArgsType()
export class CatalogStudioArgsType extends CatalogBasicArgsType {
    @IsOptional()
    @IsString()
    @Field(() => CatalogStudioSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: CatalogStudioSortField;

    @IsOptional()
    @IsNumber()
    @Field(() => Float, {
        nullable: true,
        description: 'Minimal studio rating',
    })
    min_rating?: number;

    @IsOptional()
    @IsNumber()
    @Field(() => Float, {
        nullable: true,
        description: 'Minimal number of animes produced by the studio',
    })
    min_anime_count?: number;

    @IsOptional()
    @IsNumber()
    @Field(() => Float, {
        nullable: true,
        description: 'Maximum number of animes produced by the studio',
    })
    max_anime_count?: number;

    @IsOptional()
    @IsNumber()
    @Field(() => Float, {
        nullable: true,
        description: 'Date anime starts',
    })
    anime_starts?: number;

    @IsOptional()
    @IsNumber()
    @Field(() => Float, {
        nullable: true,
        description: 'Date anime ends',
    })
    anime_ends?: number;

    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, {
        defaultValue: true,
        description:
            'If the studio is an animation studio or a different kind of company',
    })
    is_animation_studio?: boolean;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true, description: 'Genre ID string' })
    genres?: string[];
}
