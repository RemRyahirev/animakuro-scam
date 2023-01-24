import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class AiringSchedule {
    @Field(() => ID, {
        description: 'Unique ID of the airing schedule',
    })
    id?: string;

    @Field(() => Date, {
        description: 'The official airing date of the media',
    })
    airing_at: Date;

    @Field(() => Int, {
        description: 'Seconds until episode starts airing',
    })
    time_until_airing: number;

    @Field(() => Int, {
        description: 'The airing episode number',
    })
    episode: number;

    @Field(() => ID, {
        description: 'The associate anime id of the airing episode',
    })
    anime_id: string;

    @Field(() => Anime, {
        description: 'The associate Anime of the airing episode',
    })
    anime: Anime;
}
