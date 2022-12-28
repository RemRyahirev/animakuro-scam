import { ArgsType, Field, Float, ID, Int } from 'type-graphql';
import {
    IsArray,
    IsDate,
    IsDecimal,
    IsInt,
    IsOptional,
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

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    dateStart: Date;

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    dateEnd: Date;

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
    media_format?: MediaFormat;

    @IsOptional()
    @IsString()
    @Field(() => MediaSource, {
        nullable: true,
        defaultValue: MediaSource.OTHER,
    })
    source?: MediaSource;

    @IsOptional()
    @IsUUID(4)
    @Field(() => ID, { nullable: true })
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
    @IsUrl()
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
}
