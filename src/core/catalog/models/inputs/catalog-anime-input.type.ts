import { ArgsType, Field, Int, ID } from '@nestjs/graphql';
import {
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '../../../../common/models/enums';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
} from '@nestjs/class-validator';
import { CatalogBasicInputType } from './catalog-basic-input.type';
import { CatalogAnimeSortField } from '../enums/catalog-anime-sort-field.enum';

@ArgsType()
export class CatalogAnimeInputType extends CatalogBasicInputType {
    @IsOptional()
    @IsString()
    @Field(() => CatalogAnimeSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: CatalogAnimeSortField;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    country_of_origin?: string;

    @IsOptional()
    @IsString()
    @Field(() => MediaFormat, {
        nullable: true,
    })
    format?: MediaFormat;

    @IsOptional()
    @IsString()
    @Field(() => MediaSource, {
        nullable: true,
    })
    source?: MediaSource;

    @IsOptional()
    @IsString()
    @Field(() => FilmRating, { nullable: true })
    rating?: FilmRating;

    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, { nullable: true })
    is_licensed?: boolean;

    @IsOptional()
    @IsString()
    @Field(() => ReleaseStatus, {
        nullable: true,
    })
    release_status?: ReleaseStatus;

    @IsOptional()
    @IsString()
    @Field(() => AnimeType, { nullable: true })
    type?: AnimeType;

    @IsOptional()
    @IsString()
    @Field(() => YearSeason, { nullable: true })
    season?: YearSeason;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    year?: number;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true, description: 'Genre ID string' })
    genres?: string[];

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    date_start?: Date;

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    date_end?: Date;
}
