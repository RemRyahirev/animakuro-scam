import { Field, HideField, ID, Int, ObjectType } from '@nestjs/graphql';

import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class AiringSchedule {
    /**
     * Unique ID of the airing schedule
     */
    @Field(() => ID)
    id?: string;

    /**
     * The official airing date of the media
     */
    airing_at: Date;

    /**
     * The name of the airing episode
     */
    name: string;

    /**
     * The airing episode number
     */
    @Field(() => Int)
    episode: number;

    @HideField()
    anime_id: string;

    /**
     * The associate Anime of the airing episode
     */
    anime: Anime;

    /**
     * When the airing schedule was created
     */
    created_at: Date;

    /**
     * When the airing schedule was last updated
     */
    updated_at: Date;
}
