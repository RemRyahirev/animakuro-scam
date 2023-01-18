import { ArgsType, Field, Int, ID } from '@nestjs/graphql';
import {
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '../../../../common/models/enums';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
} from '@nestjs/class-validator';
import { CatalogBasicInputType } from './catalog-basic-input.type';
import { CatalogAnimeSortField } from '../enums/catalog-anime-sort-field.enum';

@ArgsType()
export class CatalogAnimeInputType extends CatalogBasicInputType {
    @IsOptional()
    @IsString()
    @Field(() => CatalogAnimeSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: CatalogAnimeSortField;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description:
            'Country where the media was created. (ISO 3166-1 alpha-2)',
    })
    country_of_origin?: string;

    @IsOptional()
    @IsString()
    @Field(() => MediaFormat, {
        nullable: true,
        description: 'The format the media was released in',
    })
    format?: MediaFormat;

    @IsOptional()
    @IsString()
    @Field(() => MediaSource, {
        nullable: true,
        description: 'Source type the media was adapted from',
    })
    source?: MediaSource;

    @IsOptional()
    @IsString()
    @Field(() => FilmRating, {
        nullable: true,
        description: 'Content rating of the media',
    })
    rating?: FilmRating;

    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, {
        nullable: true,
        description:
            'If the media is officially licensed or a self-published doujin release',
    })
    is_licensed?: boolean;

    @IsOptional()
    @IsString()
    @Field(() => ReleaseStatus, {
        nullable: true,
        description: 'The current releasing status of the media',
    })
    release_status?: ReleaseStatus;

    @IsOptional()
    @IsString()
    @Field(() => AnimeType, {
        nullable: true,
        description: 'Original anime or manga-based type of the media',
    })
    type?: AnimeType;

    @IsOptional()
    @IsString()
    @Field(() => YearSeason, {
        nullable: true,
        description: 'The season the media was initially released in',
    })
    season?: YearSeason;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'Year of production of the media',
    })
    year?: number;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true, description: 'Genre ID string' })
    genres?: string[];

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        nullable: true,
        description: 'The first official release date of the media',
    })
    date_start?: Date;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        nullable: true,
        description: 'The last official release date of the media',
    })
    date_end?: Date;
}
