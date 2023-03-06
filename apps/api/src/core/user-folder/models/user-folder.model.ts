import { Field, ID, ObjectType } from '@nestjs/graphql';

import { FolderType } from '@app/common/models/enums';

import { Anime } from '../../anime/models/anime.model';
import { UserProfile } from '../../user-profile/models/user-profile.model';

@ObjectType()
export class UserFolder {
    /**
     * Unique ID of the user-anime
     */
    @Field(() => ID)
    id: string;

    user_profile?: UserProfile;

    /**
     * Favourite anime
     */
    is_favourite?: boolean;

    @Field(() => ID)
    user_profile_id: string;

    /**
     * The media in folder
     */
    animes: Anime[];

    /**
     * Name of folder
     */
    name: string;

    /**
     * Description of folder
     */
    description: string;

    /**
     * Type of folder
     */
    @Field(() => FolderType, { defaultValue: FolderType.DEFAULT })
    type: FolderType;

    /**
     * Creation date
     */
    created_at: Date;

    /**
     * Updation date
     */
    updated_at: Date;

    /**
     * Active statistic
     */
    is_statistic_active: boolean;

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
