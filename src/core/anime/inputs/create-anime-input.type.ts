import { ArgsType, Field, Float, Int, registerEnumType } from 'type-graphql';
import { IsString, Length } from 'class-validator';
import { MediaFormat } from '../types/media-format.enum';
import { MediaSource } from '../types/media-source.enum';
import { FilmRating } from '../types/film-rating.enum';
import { ReleaseStatus } from '../types/release-status.enum';

registerEnumType(ReleaseStatus, {
    name: 'ReleaseStatus',
});

registerEnumType(FilmRating, {
    name: 'FilmRating',
});

registerEnumType(MediaSource, {
    name: 'MediaSource',
});

registerEnumType(MediaFormat, {
    name: 'MediaFormat',
});

@ArgsType()
export class CreateAnimeInputType {
    @Field()
    @IsString()
    @Length(1, 100)
    title: string;

    @Field(() => Float)
    score: number;

    @Field(() => Int)
    year: number;

    @Field(() => [String])
    genres: string[];

    @Field(() => MediaFormat, { defaultValue: MediaFormat.OTHER })
    media_format: MediaFormat;

    @Field(() => MediaSource, { defaultValue: MediaSource.OTHER })
    @IsString()
    source: MediaSource;

    @Field(() => String, { nullable: false })
    @IsString()
    studio_id: string;

    @Field(() => Int)
    seasons_count: number;

    @Field(() => Int)
    episodes_count: number;

    @Field(() => Int)
    duration: number;

    @Field(() => Date)
    next_episode: Date;

    @Field(() => FilmRating, { defaultValue: FilmRating.G })
    @IsString()
    rating: FilmRating;

    @Field(() => String)
    @IsString()
    description: string;

    @Field(() => String)
    @IsString()
    preview_link: string;

    @Field(() => String)
    @IsString()
    @Length(1, 30)
    status_description: string;

    @Field(() => ReleaseStatus, { defaultValue: ReleaseStatus.FINISHED })
    @IsString()
    release_status: ReleaseStatus;

    @Field(() => [String])
    characters: string[];

    @Field(() => [String])
    authors: string[];
}
