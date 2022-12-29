import { Field, ID, ObjectType } from 'type-graphql';
import {SubscribeTier} from "../../../common/models/enums";
import {ModeratorRoles} from "../../../common/models/enums";
import {User} from "../../user/models/user.model";
import {UserAnime} from "../../user-anime/models/user-anime.model";

@ObjectType()
export class UserProfile {
    @Field(() => ID)
    id?: string;

    @Field()
    userId: User;

    // ! вернуть это поле после того, как оформлю UserAnime целиком
    // @Field(() => UserAnime)
    // user_anime: UserAnime;

    @Field({nullable: true})
    displayed_name?: string;

    @Field({nullable: true})
    profile_picture_id?: string;

    @Field({nullable: true})
    banner_image?: string;

    @Field({nullable: true})
    about?: string

    @Field({nullable: true})
    country?: string

    @Field({nullable: true})
    language?: string;

    @Field({defaultValue: new Date()})
    createdAt: Date;

    @Field(() => SubscribeTier,
        {defaultValue: SubscribeTier.FREE_ACCOUNT})
    subscribe_tier: string;

    @Field(() => ModeratorRoles,
        {defaultValue: ModeratorRoles.VIEWER})
    moderator_role: string;

    @Field({defaultValue: false})
    isBlocked: boolean

}
