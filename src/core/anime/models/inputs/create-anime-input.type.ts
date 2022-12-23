import { ArgsType, Field, Float, ID, Int } from "type-graphql";
import {
    ArrayNotEmpty,
    IsDate,
    IsInt, IsNumber,
    IsString, IsUrl, IsUUID,
    Length
} from "class-validator";
import {
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
} from '../../../../common/models/enums';

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

    // @IsUUID(undefined, { each: true })
    @ArrayNotEmpty({
        message: 'array of genre id\'s not provided'
    })
    @Field(() => [String], { description: 'Array of genre id\'s' })
    genres: string[];

    @IsString()
    @Field(() => MediaFormat, { defaultValue: MediaFormat.OTHER })
    media_format: MediaFormat;

    @IsString()
    @Field(() => MediaSource, { defaultValue: MediaSource.OTHER })
    source: MediaSource;

    // @IsUUID(4)
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

    // @IsUUID(4, { each: true })
    @ArrayNotEmpty({
        message: 'array of character id\'s not provided'
    })
    @Field(() => [ID], { description: 'Array of character id\'s' })
    characters: string[];

    // @IsUUID(4, { each: true })
    @ArrayNotEmpty({
        message: 'array of author id\'s not provided'
    })
    @Field(() => [ID], { description: 'Array of author id\'s' })
    authors: string[];
}
