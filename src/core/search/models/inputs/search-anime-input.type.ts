import { IsOptional, IsString, Length } from 'class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
    AnimeRelation,
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '../../../../common/models/enums';
import { IsBoolean, IsInt } from '@nestjs/class-validator';

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
    })
    format?: MediaFormat;

    @IsOptional()
    @IsString()
    @Field(() => MediaSource, {
        nullable: true,
    })
    source?: MediaSource;

    @IsOptional()
    @IsString()
    @Field(() => FilmRating, { nullable: true })
    rating?: FilmRating;

    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, { nullable: true })
    is_licensed?: boolean;

    @IsOptional()
    @IsString()
    @Field(() => ReleaseStatus, {
        nullable: true,
    })
    release_status?: ReleaseStatus;

    @IsOptional()
    @IsString()
    @Field(() => AnimeType, { nullable: true })
    type?: AnimeType;

    @IsOptional()
    @IsString()
    @Field(() => YearSeason, { nullable: true })
    season?: YearSeason;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    year?: number;

    @IsOptional()
    @IsString()
    @Field(() => [AnimeRelation], {
        nullable: true,
    })
    related_status?: AnimeRelation[];

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    genres?: string;
}
