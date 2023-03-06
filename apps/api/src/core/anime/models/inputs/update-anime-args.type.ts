import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsInt,
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
export class UpdateAnimeArgsType {
    @IsUUID(4)
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    title?: string;

    @IsOptional()
    @IsNumber()
    score?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int)
    year?: number;

    @IsOptional()
    @IsString()
    @Length(1, 2)
    country_of_origin?: string;

    @IsOptional()
    @IsDate()
    date_start?: Date;

    @IsOptional()
    @IsDate()
    date_end?: Date;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    genres_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    genres_remove?: string[];

    @IsOptional()
    @IsString()
    @Field(() => MediaFormat, { defaultValue: MediaFormat.OTHER })
    format?: MediaFormat;

    @IsOptional()
    @IsString()
    @Field(() => MediaSource, { defaultValue: MediaSource.OTHER })
    source?: MediaSource;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    studios_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    studios_remove?: string[];

    @IsOptional()
    @IsInt()
    @Field(() => Int)
    seasons_count?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int)
    episodes?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int)
    duration?: number;

    @IsOptional()
    @IsDate()
    next_episode?: Date;

    @IsOptional()
    @IsString()
    @Field(() => FilmRating, { defaultValue: FilmRating.G })
    rating?: FilmRating;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    preview_link?: string;

    @IsOptional()
    @IsString()
    @Length(1, 30)
    status_description?: string;

    @IsOptional()
    @IsBoolean()
    @Field({ defaultValue: true })
    is_licensed?: boolean;

    @IsOptional()
    hashtags?: string[];

    @IsOptional()
    synonyms?: string[];

    @IsOptional()
    @IsString()
    @Field(() => ReleaseStatus, { defaultValue: ReleaseStatus.COMPLETED })
    release_status?: ReleaseStatus;

    @IsOptional()
    @IsString()
    @Field(() => AnimeType, { defaultValue: AnimeType.ANIME })
    type?: AnimeType;

    @IsOptional()
    @IsString()
    @Field(() => YearSeason, { defaultValue: YearSeason.FALL })
    season?: YearSeason;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    characters_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    characters_remove?: string[];

    @IsOptional()
    @IsArray()
    authors_add?: AnimeAuthorAddInputType[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    authors_remove?: string[];

    /**
     * Add to the list of relating animes
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => RelateInputType)
    related_by_animes_add?: RelateInputType[];

    /**
     * Remove from the list of relating animes
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => RelateInputType)
    related_by_animes_remove?: RelateInputType[];

    /**
     * Add to the list of similar animes
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SimilarInputType)
    similar_by_animes_add?: SimilarInputType[];

    /**
     * Remove from the list of similar animes
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SimilarInputType)
    similar_by_animes_remove?: SimilarInputType[];

    @IsOptional()
    @Field(() => GraphQLUpload)
    banner?: Promise<FileUpload>;

    @IsOptional()
    @Field(() => GraphQLUpload)
    cover?: Promise<FileUpload>;
}
