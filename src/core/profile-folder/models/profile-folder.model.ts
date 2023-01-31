import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserProfile } from '../../user-profile/models/user-profile.model';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class ProfileFolder {
    @Field(() => ID, {
        description: 'Unique ID of the user-anime',
    })
    id: string;

    @Field(() => UserProfile)
    profile: UserProfile;

    @Field(() => ID)
    profile_id: string;

    @Field(() => [Anime], {
        description: 'The media in folder',
        nullable: true,
    })
    animes: Anime;

    @Field(() => String, {
        description: 'Name of folder',
    })
    name: string;

    @Field(() => String, {
        description: 'Description of folder',
    })
    description: string;

    /*@Field(() => Int, {
        description: 'Which episode the user is currently watching',
    })
    episode?: number;

    @Field(() => Int, {
        description: 'Seconds: duration of the episode',                        СТАТИСТИКИ НЕТ!!!!
    })
    episode_duration?: number;

    @Field(() => Int, {
        description: 'Seconds: amount of the watched seconds ',
    })
    watched_duration?: number;*/
}
