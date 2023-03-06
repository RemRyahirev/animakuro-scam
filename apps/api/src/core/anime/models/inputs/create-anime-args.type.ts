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
import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

import {
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '@app/common/models/enums';

import { RelateInputType } from '../related-input.type';
import { SimilarInputType } from '../similar-input.type';
import { UploadStillsInputType } from '../stills.model';
import { AnimeAuthorAddInputType } from '../anime-author-add-input.type';

@ArgsType()
export class CreateAnimeArgsType {
    @IsString()
    @Length(1, 100)
    title: string;

    @IsNumber()
    score: number;

    @IsInt()
    @Field(() => Int)
    year: number;

    @IsString()
    @Length(1, 2)
    country_of_origin: string;

    @IsDate()
    date_start?: Date;

    @IsDate()
    date_end?: Date;

    /**
     * Array of genre id's to add
     */
    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    genres_add?: string[];

    @IsString()
    @Field(() => MediaFormat, { defaultValue: MediaFormat.OTHER })
    format: MediaFormat;

    @IsString()
    @Field(() => MediaSource, { defaultValue: MediaSource.OTHER })
    source: MediaSource;

    /**
     * Array of studio id's to add
     */
    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    studios_add?: string[];

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
    next_episode: Date;

    @IsString()
    @Field(() => FilmRating, { defaultValue: FilmRating.G })
    rating: FilmRating;

    @IsString()
    description: string;

    @IsUrl()
    preview_link: string;

    @IsString()
    @Length(1, 30)
    status_description: string;

    @IsBoolean()
    @Field({ defaultValue: true })
    is_licensed: boolean;

    hashtags?: string[];

    synonyms?: string[];

    @IsString()
    @Field(() => ReleaseStatus, { defaultValue: ReleaseStatus.COMPLETED })
    release_status: ReleaseStatus;

    @IsString()
    @Field(() => AnimeType, { defaultValue: AnimeType.ANIME })
    type: AnimeType;

    @IsString()
    @Field(() => YearSeason, { defaultValue: YearSeason.FALL })
    season: YearSeason;

    /**
     * Array of character id's to add
     */
    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    characters_add?: string[];

    /**
     * Array of author id's and roles id's to add
     */
    @IsOptional()
    @IsArray()
    authors_add?: AnimeAuthorAddInputType[];

    /**
     * Add to the list of relating animes
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => RelateInputType)
    related_by_animes_add?: RelateInputType[];

    /**
     * Add to the list of similar animes
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SimilarInputType)
    similar_by_animes_add?: SimilarInputType[];

    @IsOptional()
    @Field(() => GraphQLUpload)
    banner?: Promise<FileUpload>;

    @IsOptional()
    @Field(() => GraphQLUpload)
    cover?: Promise<FileUpload>;
}
