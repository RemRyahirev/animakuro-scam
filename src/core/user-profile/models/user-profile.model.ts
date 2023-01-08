import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ModeratorRoles, SubscribeTier } from '../../../common/models/enums';
import { User } from '../../user/models/user.model';

@ObjectType()
export class UserProfile {
    @Field(() => ID, {
        description: 'Unique ID of the user-profile',
    })
    id?: string;

    // это поле - для вложенной выдачи связанного User!
    @Field(() => User)
    user: User;

    // это поле - на общем уровне, показывает просто id подключенного Юзера
    @Field()
    user_id: string;

    // ! вернуть это поле после того, как оформлю UserAnime целиком
    // @Field(() => UserAnime)
    // user_anime: UserAnime;

    @Field({ nullable: true })
    displayed_name?: string;

    @Field({ nullable: true })
    profile_picture_id?: string;

    @Field({ nullable: true })
    banner_image?: string;

    @Field({ nullable: true })
    about?: string;

    @Field({ nullable: true })
    country?: string;

    @Field({ nullable: true })
    language?: string;

    @Field({ defaultValue: new Date() })
    createdAt: Date;

    @Field(() => SubscribeTier, { defaultValue: SubscribeTier.FREE_ACCOUNT })
    subscribe_tier: string;

    @Field(() => ModeratorRoles, { defaultValue: ModeratorRoles.VIEWER })
    moderator_role: string;

    @Field({ defaultValue: false })
    isBlocked: boolean;
}
