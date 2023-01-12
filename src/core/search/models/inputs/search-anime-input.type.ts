import { IsOptional, IsString, Length } from 'class-validator';
import { ArgsType, Field, Float, InputType, Int } from '@nestjs/graphql';
import {
    AnimeRelation,
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '../../../../common/models/enums';
import { IsBoolean, IsDecimal, IsInt } from '@nestjs/class-validator';

@ArgsType()
export class SearchAnimeInputType {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    @Field(() => String, { nullable: true })
    search?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    country_of_origin?: string;

    @IsOptional()
    @IsString()
    @Field(() => MediaFormat, {
        nullable: true,
        defaultValue: MediaFormat.OTHER,
    })
    format?: string;

    @IsOptional()
    @IsString()
    @Field(() => MediaSource, {
        nullable: true,
        defaultValue: MediaSource.OTHER,
    })
    source?: string;

    @IsOptional()
    @IsString()
    @Field(() => FilmRating, { nullable: true, defaultValue: FilmRating.G })
    rating?: FilmRating;

    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, { nullable: true, defaultValue: true })
    is_licensed?: boolean;

    @IsOptional()
    @IsString()
    @Field(() => ReleaseStatus, {
        nullable: true,
        defaultValue: ReleaseStatus.COMPLETED,
    })
    release_status?: ReleaseStatus;

    @IsOptional()
    @IsString()
    @Field(() => AnimeType, { nullable: true, defaultValue: AnimeType.ANIME })
    type?: AnimeType;

    @IsOptional()
    @IsString()
    @Field(() => YearSeason, { nullable: true, defaultValue: YearSeason.FALL })
    season?: YearSeason;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    year?: number;

    @IsOptional()
    @IsString()
    @Field(() => [AnimeRelation], {
        nullable: true,
        defaultValue: AnimeRelation.NULL,
    })
    related_status?: AnimeRelation[];

    @IsOptional()
    @IsDecimal()
    @Field(() => Float, { nullable: true })
    score?: number;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    genres?: string;
}
