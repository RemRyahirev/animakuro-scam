import {Field, ID, Int, ObjectType} from 'type-graphql';
import {WatchStatus} from "../../../common/models/enums";
import {UserProfile} from "../../user-profile/models/user-profile.model";
import {Anime} from "../../anime/models/anime.model";

@ObjectType()
export class UserAnime {
    @Field(() => ID)
    id?: string;

    // это поле - для вложенной выдачи связанного UserProfile
    @Field(() => UserProfile)
    userProfile: UserProfile;

    // это поле - на общем уровне, показывает просто id подключенного UserProfile
    @Field()
    userProfileId: string;

    // это поле - для вложенной выдачи связанного Anime
    @Field(() => Anime)
    anime: Anime;

    // это поле - на общем уровне, показывает просто id подключенного Anime
    @Field()
    animeId: string;

    @Field(() => WatchStatus,
        {defaultValue: WatchStatus.WATCHING})
    status: string;

    @Field({defaultValue: false})
    in_favourites: boolean

    @Field(() => Int, { nullable: true,
        description: "какой сезон данного аниме смотрит юзер"})
    season?: number

    @Field(() => Int, {nullable: true,
        description: "какой эпизод(серию)"})
    episode?: number

    @Field(() => Int, {nullable: true,
        description: "секунды: продолжительность этого эпизода"})
    episode_duration?: number

    @Field(() => Int, {nullable: true,
        description: "секунды: сколько просмотрел из этой серии"})
    watched_duration?: number

}

