import { Field, ID, ObjectType } from '@nestjs/graphql';

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
    @Field(() => ID, {
        description: 'Unique ID of the user-profile',
    })
    id?: string;

    // это поле - для вложенной выдачи связанного User!
    @Field(() => User, {
        nullable: true,
    })
    user?: User;

    // это поле - на общем уровне, показывает просто id подключенного Юзера
    @Field()
    user_id: string;

    // ! вернуть это поле после того, как оформлю UserAnime целиком
    // @Field(() => UserAnime)
    // user_anime: UserAnime;

    @Field(() => File, {
        description: 'Avatar of profile',
        nullable: true,
    })
    avatar?: File;

    @Field(() => File, {
        description: 'Banner of profile',
        nullable: true,
    })
    banner?: File;

    @Field(() => File, {
        description: 'Cover of profile',
        nullable: true,
    })
    cover?: File;

    @Field(() => String, {
        description: 'Displayed name in profile',
        nullable: true,
    })
    displayed_name: string;

    @Field(() => Gender, {
        description: 'Gender of user',
    })
    gender: Gender;

    @Field(() => Date, {
        description: 'Birthday of user',
        nullable: true,
    })
    birthday: Date;

    @Field(() => SiteTheme, {
        description: 'Site theme of profile',
    })
    site_theme: SiteTheme;

    @Field(() => ProfileCountries, {
        description: 'Profile country',
    })
    country: ProfileCountries;

    @Field(() => ProfileLanguages, {
        description: 'Profile language',
    })
    language: ProfileLanguages;

    @Field(() => String, {
        description: 'Profile Timezone',
        nullable: true,
    })
    timezone: string;

    @Field(() => ProfileType, {
        description: 'Type of profile',
    })
    profile_type: ProfileType;

    @Field(() => ModeratorRoles, {
        description: 'Role of Moderator (Actually Role of Profile)',
    })
    moderator_role: ModeratorRoles;

    @Field(() => Boolean, {
        description: 'Is blocked profile or not',
    })
    is_blocked: boolean;

    @Field(() => String, {
        description: 'About profile',
    })
    about: string;

    @Field(() => [Integration], {
        description: 'Integrations of profile in JSON format',
        nullable: true,
    })
    integrations: Integration[];

    @Field(() => Date, {
        description: 'Profile updated at',
    })
    updated_at: Date;

    @Field(() => [Anime])
    favourite_animes: Anime;

    @Field(() => [Studio])
    favourite_studios: Studio[];

    @Field(() => [Character])
    favourite_characters: Character[];

    @Field(() => [Author])
    favourite_authors: Author[];

    @Field(() => [Genre])
    favourite_genres: Genre[];

    @Field(() => [UserFolder])
    user_folders: UserFolder[];

    @Field(() => [UserCollection])
    user_collection: UserCollection[];

    @Field(() => ProfileStatistics, {
        nullable: true,
        description: 'User profile statistics',
    })
    statistics?: ProfileStatistics;
}
