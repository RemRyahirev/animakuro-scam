import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    AnimeType,
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
    YearSeason,
} from '../../../common/models/enums';
import { Genre } from '../../genre/models/genre.model';
import { Author } from '../../author/models/author.model';
import { Character } from '../../character/models/character.model';
import { Studio } from '../../studio/models/studio.model';
import { RelatingAnime } from '../../relating-anime/models/relating-anime.model';
import { SimilarAnime } from '../../similar-anime/models/similar-anime.model';

@ObjectType()
export class Anime {
    @Field(() => ID, {
        description: 'Unique ID of the media',
    })
    id?: string;

    @Field(() => String, {
        description: 'The official titles of the media in various languages',
    })
    title: string;

    @Field(() => Float, {
        description: 'Popularity rating of the media',
    })
    score: number;

    @Field(() => Int, {
        description: 'Year of production of the media',
    })
    year: number;

    @Field(() => String, {
        description:
            'Country where the media was created. (ISO 3166-1 alpha-2)',
    })
    country_of_origin: string;

    @Field(() => Date, {
        nullable: true,
        description: 'The first official release date of the media',
    })
    date_start: Date;

    @Field(() => Date, {
        nullable: true,
        description: 'The last official release date of the media',
    })
    date_end: Date;

    @Field(() => [Genre], { description: 'The genres of the media' })
    genres: Genre[];

    @Field(() => MediaFormat, {
        defaultValue: MediaFormat.OTHER,
        description: 'The format the media was released in',
    })
    format: string;

    @Field(() => MediaSource, {
        defaultValue: MediaSource.OTHER,
        description: 'Source type the media was adapted from',
    })
    source: string;

    @Field(() => Int, {
        description: 'Number of seasons',
    })
    seasons_count: number;

    @Field(() => Int, {
        description: 'The amount of episodes the anime has when complete',
    })
    episodes: number;

    @Field(() => Int, {
        description: 'The general length of each anime episode in minutes',
    })
    duration: number;

    @Field(() => Date, {
        nullable: true,
        description: 'Date format "4 apr. 03:30"',
    })
    next_episode: Date;

    @Field(() => FilmRating, {
        defaultValue: FilmRating.G,
        description: 'Content rating of the media',
    })
    rating: string;

    @Field(() => String, {
        description: 'Brief description of the media',
        nullable: true,
    })
    description: string;

    @Field(() => String, { description: 'Link to the media preview' })
    preview_link: string;

    @Field(() => String, {
        description: `Short description of the media's story and characters`,
    })
    status_description: string;

    @Field(() => Boolean, {
        defaultValue: true,
        description:
            'If the media is officially licensed or a self-published doujin release',
    })
    is_licensed: boolean;

    @Field(() => [String], {
        nullable: true,
        description: 'Official Twitter hashtags for the media',
    })
    hashtags: string[];

    @Field(() => [String], {
        nullable: true,
        description: 'Alternative titles of the media',
    })
    synonyms: string[];

    @Field(() => ReleaseStatus, {
        defaultValue: ReleaseStatus.COMPLETED,
        description: 'The current releasing status of the media',
    })
    release_status: string;

    @Field(() => AnimeType, {
        defaultValue: AnimeType.ANIME,
        description: 'Original anime or manga-based type of the media',
    })
    type: AnimeType;

    @Field(() => YearSeason, {
        defaultValue: YearSeason.FALL,
        description: 'The season the media was initially released in',
    })
    season: YearSeason;

    @Field(() => [Character], { description:"The characters in the media" })
    characters: Character[];

    @Field(() => [Author], {
        description:"List of the authors of the media",
    })
    authors: Author[];

    @Field(() => [RelatingAnime], { description: "List of relating animes" })
    relating_animes: RelatingAnime[];

    @Field(() => [RelatingAnime], { description: "List of related by animes" })
    related_by_animes: RelatingAnime[];

    @Field(() => [SimilarAnime], { description: "List of similar animes" })
    similar_animes: SimilarAnime[];

    @Field(() => [SimilarAnime], { description: "List of similar by animes" })
    similar_by_animes: SimilarAnime[];

    @Field(() => [Studio], {
        description: "The companies who produced the media",
    })
    studios: Studio[];

    @Field(() => Date, { description: 'When the anime data was created' })
    created_at: Date;

    @Field(() => Date, { description: 'When the anime data was last updated' })
    updated_at: Date;
}
