import { Extensions, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import {
    Gender,
    ModeratorRoles,
    ProfileCountries,
    ProfileLanguages,
    ProfileType,
    SiteTheme,
} from '@app/common/models/enums';
import { File } from '@app/common/models/results/file.model';
import { ProfileStatistics } from '@app/common/models/results/profile-statistics.model';

import { User } from '../../user/models/user.model';
import { Anime } from '../../anime/models/anime.model';
import { Studio } from '../../studio/models/studio.model';
import { Character } from '../../character/models/character.model';
import { Author } from '../../author/models/author.model';
import { Genre } from '../../genre/models/genre.model';
import { UserFolder } from '../../user-folder/models/user-folder.model';
import { UserCollection } from '../../user-collection/models/user-collection.model';

import { Integration } from './integration.model';

@ObjectType()
export class UserProfile {
    /**
     * Unique ID of the user-profile
     */
    @Field(() => ID)
    id?: string;

    // это поле - для вложенной выдачи связанного User!
    user?: User;

    // это поле - на общем уровне, показывает просто id подключенного Юзера
    user_id: string;

    // ! вернуть это поле после того, как оформлю UserAnime целиком
    // @Field(() => UserAnime)
    // user_anime: UserAnime;

    /**
     * Avatar of profile
     */
    avatar?: File;

    /**
     * Banner of profile
     */
    banner?: File;

    /**
     * Cover of profile
     */
    cover?: File;

    /**
     * Displayed name in profile
     */
    displayed_name: string;

    /**
     * Gender of user
     */
    @Field(() => Gender)
    gender: Gender;

    /**
     * Birthday of user
     */
    birthday?: Date;

    /**
     * Site theme of profile
     */
    @Field(() => SiteTheme)
    site_theme: SiteTheme;

    /**
     * Profile country
     */
    @Field(() => ProfileCountries)
    country: ProfileCountries;

    /**
     * Profile language
     */
    @Field(() => ProfileLanguages)
    language: ProfileLanguages;

    /**
     * Profile Timezone
     */
    timezone?: string;

    /**
     * Type of profile
     */
    @Field(() => ProfileType)
    profile_type: ProfileType;

    /**
     * Role of Moderator (Actually Role of Profile)
     */
    @Field(() => ModeratorRoles)
    moderator_role: ModeratorRoles;

    /**
     * Is blocked profile or not
     */
    is_blocked: boolean;

    /**
     * About profile
     */
    about: string;

    /**
     * Integrations of profile in JSON format
     */
    integrations?: Integration[];

    /**
     * Profile updated at
     */
    updated_at: Date;

    favourite_animes: Anime;

    favourite_studios: Studio[];

    favourite_characters: Character[];

    favourite_authors: Author[];

    favourite_genres: Genre[];

    favourite_collections: UserCollection[];

    user_folders: UserFolder[];

    user_collection: UserCollection[];

    /**
     * User profile statistics
     */
    @Extensions({ userIdFilter: { userIdField: '@user_id' } })
    statistics?: ProfileStatistics;
}
