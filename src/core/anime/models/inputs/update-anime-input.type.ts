import { ArgsType, Field, Float, ID, Int } from 'type-graphql';
import {
    IsArray,
    IsDate,
    IsDecimal,
    IsInt,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import {
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
} from '../../../../common/models/enums';

@ArgsType()
export class UpdateAnimeInputType {
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

    @IsOptional()
    @IsArray()
    @Field(() => [String], { nullable: true })
    genres?: string[];

    @IsOptional()
    @IsString()
    @Field(() => MediaFormat, {
        nullable: true,
        defaultValue: MediaFormat.OTHER,
    })
    media_format?: MediaFormat;

    @IsOptional()
    @IsString()
    @Field(() => MediaSource, {
        nullable: true,
        defaultValue: MediaSource.OTHER,
    })
    source?: MediaSource;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    studio_id?: string;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    seasons_count?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    episodes_count?: number;

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
    @IsString()
    @Field(() => String, { nullable: true })
    preview_link?: string;

    @IsOptional()
    @IsString()
    @Length(1, 30)
    @Field(() => String, { nullable: true })
    status_description?: string;

    @IsOptional()
    @IsString()
    @Field(() => ReleaseStatus, {
        nullable: true,
        defaultValue: ReleaseStatus.FINISHED,
    })
    release_status?: ReleaseStatus;

    @IsOptional()
    @IsArray()
    @Field(() => [String], { nullable: true })
    characters?: string[];

    @IsOptional()
    @IsArray()
    @Field(() => [String], { nullable: true })
    authors?: string[];
}
