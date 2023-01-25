import {Field, HideField, ID, Int, ObjectType} from '@nestjs/graphql';
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

    @Field(() => String, {
        description: 'The name of the airing episode',
    })
    name: string;

    @Field(() => Int, {
        description: 'The airing episode number',
    })
    episode: number;

    @HideField()
    anime_id: string;

    @Field(() => Anime, {
        description: 'The associate Anime of the airing episode',
    })
    anime: Anime;

    @Field(() => Date, { description: 'When the airing schedule was created' })
    created_at: Date;

    @Field(() => Date, { description: 'When the airing schedule was last updated' })
    updated_at: Date;
}
