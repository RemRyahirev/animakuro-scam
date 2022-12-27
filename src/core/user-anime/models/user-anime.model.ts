import {Field, ID, Int, ObjectType} from 'type-graphql';
import {WatchStatus} from "../../../common/models/enums";
import {UserProfile} from "../../user-profile/models/user-profile.model";
import {Anime} from "../../anime/models/anime.model";

@ObjectType()
export class UserAnime {
    @Field(() => ID)
    id: string;

    @Field(() => UserProfile)
    user_profile: UserProfile;

    @Field(() => Anime)
    anime: Anime;

    @Field(() => WatchStatus,
        {defaultValue: WatchStatus.WATCHING})
    status: string;

    @Field({defaultValue: false})
    in_favourites: boolean

    @Field(() => Int, {description: "какой сезон данного аниме смотрит юзер"})
    season?: number

    @Field(() => Int, {description: "какой эпизод(серию)"})
    episode?: number

    @Field(() => Int, {description: "секунды: продолжительность этого эпизода"})
    episode_duration?: number

    @Field(() => Int, {description: "секунды: сколько просмотрел из этой серии"})
    watched_duration?: number


}

