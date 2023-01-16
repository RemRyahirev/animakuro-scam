import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class AiringSchedule {
    @Field(() => Date)
    airing_at: Date;

    @Field(() => Int, {
        nullable: true,
        defaultValue: null,
    })
    time_until_airing: number;

    @Field(() => Int, {
        nullable: true,
        defaultValue: null,
    })
    episode: number;

    @Field(() => ID)
    anime_id: string;

    @Field(() => Anime, {
        nullable: true,
        defaultValue: null,
        description: 'Anime',
    })
    anime: Anime;
}
