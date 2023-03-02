import { Field, ID, ObjectType } from '@nestjs/graphql';

import { AuthType } from '@app/common/models/enums/auth-type.enum';
import { UserStatistics } from '@app/common/models/results/user-statistics.model';

import { UserProfile } from '../../user-profile/models/user-profile.model';
import { Anime } from '../../anime/models/anime.model';
import { Studio } from '../../studio/models/studio.model';
import { Character } from '../../character/models/character.model';
import { Author } from '../../author/models/author.model';
import { Genre } from '../../genre/models/genre.model';
import { UserFolder } from '../../user-folder/models/user-folder.model';
import { UserCollection } from '../../user-collection/models/user-collection.model';

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

    @Field(() => String, { nullable: true, description: 'Email of the user' })
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

    @Field(() => UserProfile, {
        description: 'User Profile',
        nullable: true,
    })
    user_profile: UserProfile | null;

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

    @Field(() => [UserCollection])
    favourite_collections: UserCollection[];

    @Field(() => [UserFolder])
    user_folders: UserFolder[];

    @Field(() => [UserCollection])
    user_collection: UserCollection[];

    @Field(() => UserStatistics, {
        nullable: true,
        description: 'User statistics',
    })
    statistics?: UserStatistics;
}
