import { Extensions, Field, ID, ObjectType } from '@nestjs/graphql';

import { SubscribeTier } from '@app/common/models/enums';

import { UserProfile } from '../../user-profile/models/user-profile.model';

import { Notifications } from './notifications.model';
import { AnimeHistory } from '../../anime/models/history.model';
import { AuthorHistory } from '../../author/models/history.model';
import { CharacterHistory } from '../../character/models/history.model';

@Extensions({ userIdFilter: { userIdField: 'id' } })
@ObjectType()
export class User {
    @Field(() => ID, {
        description: 'Unique ID of the user',
    })
    id: string;

    @Field(() => String, {
        nullable: true,
        description: 'Username',
    })
    username?: string;

    @Field(() => String, {
        nullable: true,
        description: 'Email of the user',
    })
    email?: string | null;

    @Field(() => Boolean, {
        nullable: true,
        description: 'Email verified status of the user',
    })
    is_email_confirmed?: boolean | null;

    @Field(() => String, {
        nullable: true,
        description: 'Avatar (image) of the user',
    })
    avatar?: string | null;

    @Field(() => Notifications, {
        nullable: true,
    })
    notifications?: Notifications;

    @Field(() => SubscribeTier, {
        description: 'Type of profile subscription',
        nullable: true,
    })
    subscribe_tier?: SubscribeTier;

    @Field(() => UserProfile, {
        description: 'User Profile',
        nullable: true,
    })
    user_profile: UserProfile | null;

    @Field(() => [AnimeHistory], {
        nullable: true,
        description: 'Anime browsing history'
    })
    anime_history?: AnimeHistory[];

    @Field(() => [AuthorHistory], {
        nullable: true,
        description: 'Author browsing history'
    })
    author_history?: AuthorHistory[];

    @Field(() => [CharacterHistory], {
        nullable: true,
        description: 'Anime browsing history'
    })
    character_history?: CharacterHistory[];
}
