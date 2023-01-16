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
import { IsArray, IsBoolean, IsInt } from "@nestjs/class-validator";
import { SortOrder } from "../../../../common/models/enums/sort-order.enum";
import { SearchSortField } from "../enums/search-sort-field.enum";

@ArgsType()
export class SearchAnimeInputType {
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
    @IsString()
    @Field(() => SearchSortField, { nullable: true })
    sortField?: SearchSortField

    @IsOptional()
    @IsString()
    @Field(() => SortOrder, { nullable: true })
    sortOrder?: SortOrder
}
