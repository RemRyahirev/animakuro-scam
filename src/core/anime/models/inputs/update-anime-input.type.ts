import { ArgsType, Field, Float, ID, Int } from '@nestjs/graphql';
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
} from '@nestjs/class-validator';
import {
    AnimeApproval,
    AnimeRelation,
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '../../../../common/models/enums';
import { IsNumber } from 'class-validator';

@ArgsType()
export class UpdateAnimeInputType {
    @IsUUID(4)
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    @Field(() => String, { nullable: true })
    title?: string;

    @IsOptional()
    @IsNumber()
    @Field(() => Float, { nullable: true })
    score?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    year?: number;

    @IsString()
    @Length(1, 2)
    @Field(() => String, { nullable: true })
    country_of_origin: string;

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    date_start: Date;

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    date_end: Date;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    genres_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    genres_remove?: string[];

    @IsOptional()
    @IsString()
    @Field(() => MediaFormat, {
        nullable: true,
        defaultValue: MediaFormat.OTHER,
    })
    format?: MediaFormat;

    @IsOptional()
    @IsString()
    @Field(() => MediaSource, {
        nullable: true,
        defaultValue: MediaSource.OTHER,
    })
    source?: MediaSource;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    studios_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    studios_remove?: string[];

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    seasons_count?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    episodes?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    duration?: number;

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    next_episode?: Date;

    @IsOptional()
    @IsString()
    @Field(() => FilmRating, { nullable: true, defaultValue: FilmRating.G })
    rating?: FilmRating;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    description?: string;

    @IsOptional()
    @IsUrl()
    @Field(() => String, { nullable: true })
    preview_link?: string;

    @IsOptional()
    @IsString()
    @Length(1, 30)
    @Field(() => String, { nullable: true })
    status_description?: string;

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: true })
    is_licensed: boolean;

    @Field(() => [String], { nullable: true })
    hashtags: string[];

    @Field(() => [String], { nullable: true })
    synonyms: string[];

    @IsOptional()
    @IsString()
    @Field(() => ReleaseStatus, {
        nullable: true,
        defaultValue: ReleaseStatus.COMPLETED,
    })
    release_status?: ReleaseStatus;

    @IsString()
    @Field(() => AnimeType, { defaultValue: AnimeType.ANIME })
    type: AnimeType;

    @IsString()
    @Field(() => YearSeason, { defaultValue: YearSeason.FALL })
    season: YearSeason;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    characters_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    characters_remove?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    authors_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    authors_remove?: string[];

    @IsOptional()
    @Field(() => [ID], {
        nullable: true,
        description: 'Add to the list of relating animes',
    })
    related_by_animes_add: string[];

    @IsOptional()
    @Field(() => [AnimeRelation], {
        nullable: true,
        defaultValue: [AnimeRelation.NULL],
        description: 'Add related status of related anime',
    })
    related_status: [AnimeRelation];

    @IsOptional()
    @Field(() => [ID], {
        nullable: true,
        description: 'Remove from the list of relating animes',
    })
    related_by_animes_remove: string[];

    @IsOptional()
    @Field(() => [ID], {
        nullable: true,
        description: 'Add to the list of similar animes',
    })
    similar_by_animes_add: string[];

    @IsOptional()
    @Field(() => [AnimeApproval], {
        nullable: true,
        defaultValue: [AnimeApproval.PENDING],
        description: 'Add anime approval of similar anime',
    })
    similar_status: [AnimeApproval];

    @IsOptional()
    @Field(() => [ID], {
        nullable: true,
        description: 'Remove from the list of similar animes',
    })
    similar_by_animes_remove: string[];
}
