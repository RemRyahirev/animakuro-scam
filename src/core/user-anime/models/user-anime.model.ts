import { Field, ID, Int, ObjectType } from 'type-graphql';
import { WatchStatus } from '../../../common/models/enums';
import { UserProfile } from '../../user-profile/models/user-profile.model';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class UserAnime {
    @Field(() => ID, {
        description: 'Unique ID of the user-anime',
    })
    id: string;

    @Field(() => UserProfile)
    user_profile: UserProfile;

    @Field(() => Anime, {
        description: 'The media the user is currently watching',
    })
    anime: Anime;

    @Field(() => WatchStatus, {
        defaultValue: WatchStatus.WATCHING,
        description: 'Status of watching the media ',
    })
    status: string;

    @Field({
        defaultValue: false,
        description: 'If the media is in favorite list of the user',
    })
    in_favourites: boolean;

    @Field(() => Int, {
        description: 'Which season the user is currently watching',
    })
    season?: number;

    @Field(() => Int, {
        description: 'Which episode the user is currently watching',
    })
    episode?: number;

    @Field(() => Int, {
        description: 'Seconds: duration of the episode',
    })
    episode_duration?: number;

    @Field(() => Int, {
        description: 'Seconds: amount of the watched seconds ',
    })
    watched_duration?: number;
}
