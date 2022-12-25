import { Field, Float, ID, ObjectType } from 'type-graphql';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class Studio {
    @Field(() => ID)
    id?: string;

    @Field(() => String)
    studio_name: string;

    @Field(() => Float)
    rating: number;

    @Field(() => String)
    thumbnail: string;

    @Field(() => [Anime])
    anime: Anime[];

    @Field(() => Date)
    createdAt: Date;
}
