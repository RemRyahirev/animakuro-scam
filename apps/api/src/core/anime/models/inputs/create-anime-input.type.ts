import { Type } from 'class-transformer';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Length,
    ValidateNested,
} from '@nestjs/class-validator';
import { ArgsType, Field, Float, ID, Int } from '@nestjs/graphql';

import {
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '@app/common/models/enums';

import { Relate } from '../related.model';
import { Similar } from '../similar.model';
import { UploadStills } from '../stills.model';

@ArgsType()
export class CreateAnimeInputType {
    @IsString()
    @Length(1, 100)
    @Field(() => String)
    title: string;

    @IsNumber()
    @Field(() => Float)
    score: number;

    @IsInt()
    @Field(() => Int)
    year: number;

    @IsString()
    @Length(1, 2)
    @Field(() => String, { nullable: true })
    country_of_origin: string;

    @IsDate()
    @Field(() => Date, { nullable: true })
    date_start: Date;

    @IsDate()
    @Field(() => Date, { nullable: true })
    date_end: Date;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String], {
        description: "Array of genre id's to add",
        nullable: true,
    })
    genres_add: string[];

    @IsString()
    @Field(() => MediaFormat, { defaultValue: MediaFormat.OTHER })
    format: MediaFormat;

    @IsString()
    @Field(() => MediaSource, { defaultValue: MediaSource.OTHER })
    source: MediaSource;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], {
        description: "Array of studio id's to add",
        nullable: true,
    })
    studios_add: string[];

    @IsInt()
    @Field(() => Int)
    seasons_count: number;

    @IsInt()
    @Field(() => Int)
    episodes: number;

    @IsInt()
    @Field(() => Int)
    duration: number;

    @IsDate()
    @Field(() => Date, {
        nullable: true,
    })
    next_episode: Date;

    @IsString()
    @Field(() => FilmRating, { defaultValue: FilmRating.G })
    rating: FilmRating;

    @IsString()
    @Field(() => String, { nullable: true })
    description: string;

    @IsUrl()
    @Field(() => String)
    preview_link: string;

    @IsString()
    @Length(1, 30)
    @Field(() => String)
    status_description: string;

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: true })
    is_licensed: boolean;

    @Field(() => [String], { nullable: true })
    hashtags: string[];

    @Field(() => [String], { nullable: true })
    synonyms: string[];

    @IsString()
    @Field(() => ReleaseStatus, { defaultValue: ReleaseStatus.COMPLETED })
    release_status: ReleaseStatus;

    @IsString()
    @Field(() => AnimeType, { defaultValue: AnimeType.ANIME })
    type: AnimeType;

    @IsString()
    @Field(() => YearSeason, { defaultValue: YearSeason.FALL })
    season: YearSeason;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], {
        description: "Array of character id's to add",
        nullable: true,
    })
    characters_add: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], {
        description: "Array of author id's to add",
        nullable: true,
    })
    authors_add: string[];

    @IsOptional()
    @ValidateNested()
    @Type(() => Relate)
    @Field(() => [Relate], {
        nullable: true,
        description: 'Add to the list of relating animes',
    })
    related_by_animes_add: string[];

    @IsOptional()
    @ValidateNested()
    @Type(() => Similar)
    @Field(() => [Similar], {
        nullable: true,
        description: 'Add to the list of similar animes',
    })
    similar_by_animes_add: string[];

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    banner?: Promise<FileUpload>;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    cover?: Promise<FileUpload>;
}
