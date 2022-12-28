import { ArgsType, Field, Float, ID, Int } from 'type-graphql';
import {
    IsArray,
    IsDate,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Length,
} from 'class-validator';
import {
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
} from '../../../../common/models/enums';
import { AnimeRelation } from '../../../../common/models/enums/anime-relation.enum';
import { Anime } from '../anime.model';

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

    @IsDate()
    @Field(() => Date, { nullable: true })
    dateStart: Date;

    @IsDate()
    @Field(() => Date, { nullable: true })
    dateEnd: Date;

    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String], { description: "Array of genre id's to add" })
    genresToAdd: string[];

    @IsString()
    @Field(() => MediaFormat, { defaultValue: MediaFormat.OTHER })
    media_format: MediaFormat;

    @IsString()
    @Field(() => MediaSource, { defaultValue: MediaSource.OTHER })
    source: MediaSource;

    @IsUUID(4)
    @Field(() => ID)
    studio_id: string;

    @IsInt()
    @Field(() => Int)
    seasons_count: number;

    @IsInt()
    @Field(() => Int)
    episodes_count: number;

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

    @IsString()
    @Field(() => ReleaseStatus, { defaultValue: ReleaseStatus.FINISHED })
    release_status: ReleaseStatus;

    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { description: "Array of character id's to add" })
    charactersToAdd: string[];

    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { description: "Array of author id's to add" })
    authorsToAdd: string[];

    @IsOptional()
    @Field(() => [Anime])
    related_animes: Anime[];

    @IsOptional()
    @IsString()
    @Length(1, 20)
    @Field(() => AnimeRelation, { defaultValue: null })
    related_status: AnimeRelation;
}
