import { ArgsType, Field, Float, ID, Int } from 'type-graphql';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsDecimal,
    IsInt,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Length,
} from 'class-validator';
import {
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '../../../../common/models/enums';
import { AnimeRelation } from '../../../../common/models/enums/anime-relation.enum';
import { Anime } from '../anime.model';

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
    @IsDecimal()
    @Field(() => Float, { nullable: true })
    score?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    year?: number;

    @IsString()
    @Length(1, 2)
    @Field(() => String)
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
    genresToAdd?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    genresToRemove?: string[];

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
    studiosToAdd?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    studiosToRemove?: string[];

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
    charactersToAdd?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    charactersToRemove?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    authorsToAdd?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    authorsToRemove?: string[];

    @IsOptional()
    @Field(() => [ID], {
        nullable: true,
        description: 'Add to the list of related animes',
    })
    related_animes_add: string[];

    @IsOptional()
    @Field(() => [ID], {
        nullable: true,
        description: 'Remove from the list of related animes',
    })
    related_animes_remove: string[];

    @IsOptional()
    @IsString()
    @Length(1, 20)
    @Field(() => AnimeRelation, {
        nullable: true,
        defaultValue: AnimeRelation.NULL,
    })
    related_status: AnimeRelation;
}
