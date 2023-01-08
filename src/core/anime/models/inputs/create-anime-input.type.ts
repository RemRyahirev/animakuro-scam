import { ArgsType, Field, Float, ID, Int } from '@nestjs/graphql';
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
} from '@nestjs/class-validator';
import {
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '../../../../common/models/enums';
import { AnimeRelation } from '../../../../common/models/enums/anime-relation.enum';

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

    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String], { description: "Array of genre id's to add" })
    genresToAdd: string[];

    @IsString()
    @Field(() => MediaFormat, { defaultValue: MediaFormat.OTHER })
    format: MediaFormat;

    @IsString()
    @Field(() => MediaSource, { defaultValue: MediaSource.OTHER })
    source: MediaSource;

    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { description: "Array of studio id's to add" })
    studiosToAdd: string[];

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
    @Field(() => Date)
    next_episode: Date;

    @IsString()
    @Field(() => FilmRating, { defaultValue: FilmRating.G })
    rating: FilmRating;

    @IsString()
    @Field(() => String)
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

    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { description: "Array of character id's to add" })
    charactersToAdd: string[];

    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { description: "Array of author id's to add" })
    authorsToAdd: string[];

    @IsOptional()
    @Field(() => [ID], { description: 'Add to the list of related animes' })
    related_animes_add: string[];

    @IsOptional()
    @IsString()
    @Length(1, 20)
    @Field(() => AnimeRelation, { nullable: true, defaultValue: null })
    related_status: AnimeRelation;
}
