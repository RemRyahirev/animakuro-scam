import { IsOptional, IsString, Length } from 'class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '../../../../common/models/enums';
import { IsArray, IsBoolean, IsDate, IsInt } from "@nestjs/class-validator";
import { SortOrder } from "../../../../common/models/enums/sort-order.enum";
import { CatalogSortField } from "../enums/catalog-sort-field.enum";

@ArgsType()
export class CatalogAnimeInputType {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    @Field(() => String, { nullable: true })
    search?: string;

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
    @IsArray()
    @Field(() => [String], { nullable: true })
    genres?: string[];

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    date_start?: Date;

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    date_end?: Date;

    @IsOptional()
    @IsString()
    @Field(() => CatalogSortField, { nullable: true })
    sortField?: CatalogSortField

    @IsOptional()
    @IsString()
    @Field(() => SortOrder, { nullable: true })
    sortOrder?: SortOrder
}
