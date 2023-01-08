import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class Studio {
    @Field(() => ID, {
        description: 'Unique ID of the studio',
    })
    id?: string;

    @Field(() => String, {
        description: 'Name of the studio',
    })
    studio_name: string;

    @Field(() => Float, {
        description: 'Rating of the studio',
    })
    rating: number;

    @Field(() => String)
    thumbnail: string;

    @Field(() => [Anime], {
        description: 'Animes produced by the studio',
    })
    anime: Anime[];

    @Field(() => Int, {
        description: 'Number of animes produced by the studio',
    })
    anime_count: number;

    @Field(() => Int)
    anime_starts: number;

    @Field(() => Int)
    anime_ends: number;

    @Field(() => Date)
    createdAt: Date;
}
