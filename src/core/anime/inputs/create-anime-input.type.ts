import { ArgsType, Field, Float, Int, registerEnumType } from "type-graphql";
import { IsOptional, IsString, Length } from "class-validator";
import { MediaFormat } from "../types/media-format.enum";
import { MediaSource } from "../types/media-source.enum";
import { FilmRating } from "../types/film-rating.enum";
import { ReleaseStatus } from "../types/release-status.enum";

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
    media_format: string;

    @Field(() => MediaSource, { defaultValue: MediaSource.OTHER })
    @IsString()
    source: string;

    @Field(() => String, { nullable: false })
    @IsString()
    studio_id: string;

    // @Field(() => String, { nullable: true })
    // @IsOptional()
    // @IsString()
    // studio?: string;

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
    rating: string;

    @Field()
    @IsString()
    description: string;

    @Field()
    @IsString()
    preview_link: string;

    @Field()
    @IsString()
    @Length(1, 30)
    status_description: string;

    @Field(() => ReleaseStatus, { defaultValue: ReleaseStatus.FINISHED })
    @IsString()
    release_status: string;

    @Field(() => [String])
    characters: String[];

    @Field(() => [String])
    authors: String[];
}
