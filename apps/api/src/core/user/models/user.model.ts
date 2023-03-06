import { Extensions, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { SubscribeTier } from '@app/common/models/enums';

import { UserProfile } from '../../user-profile/models/user-profile.model';

import { Notifications } from './notifications.model';
import { AnimeHistory } from '../../anime/models/history.model';
import { AuthorHistory } from '../../author/models/history.model';
import { CharacterHistory } from '../../character/models/history.model';

@Extensions({ userIdFilter: { userIdField: 'id' } })
@ObjectType()
export class User {
    /**
     * Unique ID of the user
     */
    @Field(() => ID)
    id: string;

    /**
     * Username
     */
    username?: string;

    /**
     * Email of the user
     */
    email?: string;

    /**
     * Email verified status of the user
     */
    is_email_confirmed?: boolean;

    /**
     * Avatar (image) of the user
     */
    avatar?: string;

    // notifications?: Notifications;

    /**
     * Type of profile subscription
     */
    @Field(() => SubscribeTier)
    subscribe_tier?: SubscribeTier;

    /**
     * User Profile
     */
    user_profile?: UserProfile;

    /**
     * Anime browsing history
     */
    anime_history?: AnimeHistory[];

    /**
     * Author browsing history
     */
    author_history?: AuthorHistory[];

    /**
     * Anime browsing history
     */
    character_history?: CharacterHistory[];
}
