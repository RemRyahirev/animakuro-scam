import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import {
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
} from '../../../common/models/enums';
import { Genre } from '../../genre/models/genre.model';
import { Author } from '../../author/models/author.model';
import { Character } from '../../character/models/character.model';
import { Studio } from '../../studio/models/studio.model';

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

    @Field(() => Date, { nullable: true })
    dateStart: Date;

    @Field(() => Date, { nullable: true })
    dateEnd: Date;

    @Field(() => [Genre])
    genres: Genre[];

    @Field(() => MediaFormat, { defaultValue: MediaFormat.OTHER })
    media_format: string;

    @Field(() => MediaSource, { defaultValue: MediaSource.OTHER })
    source: string;

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

    @Field(() => [Character])
    characters: Character[];

    @Field(() => [Author])
    authors: Author[];

    @Field(() => [Studio])
    studios: Studio[];
}
