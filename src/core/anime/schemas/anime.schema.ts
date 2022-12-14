import { Field, Float, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { ReleaseStatus } from '../types/release-status.enum';
import { FilmRating } from '../types/film-rating.enum';
import { MediaSource } from '../types/media-source.enum';
import { MediaFormat } from "../types/media-format.enum";

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

@ObjectType()
export class Anime {
    @Field(() => ID)
    id?: string;

    @Field(() => String)
    title: string;

    @Field(() => Float)
    score: number;

    @Field(() => Int)
    year: number;

    @Field(() => [String])
    genres: string[];

    @Field(() => MediaFormat, { defaultValue: MediaFormat.OTHER })
    media_format: string;

    @Field(() => MediaSource, { defaultValue: MediaSource.OTHER })
    source: string;

    @Field(() => String, { nullable: false })
    studio_id: string;

    @Field(() => Int)
    seasons_count: number;

    @Field(() => Int)
    episodes_count: number;

    @Field(() => Int, { description: 'Duration in seconds' })
    duration: number;

    @Field(() => Date, { description: 'Date format "4 apr. 03:30"' })
    next_episode: Date;

    @Field(() => FilmRating, { defaultValue: FilmRating.G })
    rating: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    preview_link: string;

    @Field(() => String)
    status_description: string;

    @Field(() => ReleaseStatus, { defaultValue: ReleaseStatus.FINISHED })
    release_status: string;

    @Field(() => [String])
    characters: string[];

    @Field(() => [String])
    authors: string[];
}
