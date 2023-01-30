import { UserProfile } from '../../user-profile/models/user-profile.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Anime } from '../../anime/models/anime.model';
import { Studio } from '../../studio/models/studio.model';
import { Character } from '../../character/models/character.model';
import { Author } from '../../author/models/author.model';
import { Genre } from '../../genre/models/genre.model';
import { Media } from '../../../common/models/enums';
import { Media as MediaPrisma } from '@prisma/client';

@ObjectType()
export class ProfileFavourites {
    @Field(() => ID, {
        description: 'Unique ID of the profile-favourites',
    })
    id: string;

    @Field(() => UserProfile, {
        description: 'User Profile Model',
    })
    profile: UserProfile;

    @Field(() => ID, {
        description: 'Unique ID of the profile',
    })
    profile_id: string;

    @Field(() => [Anime], {
        description: 'Anime Model',
    })
    animes: Anime[];

    @Field(() => [Studio], {
        description: 'Studio Model',
    })
    studios: Studio[];

    @Field(() => [Character], {
        description: 'Character Model',
    })
    characters: Character[];

    @Field(() => [Author], {
        description: 'Author Model',
    })
    authors: Author[];

    @Field(() => [Genre], {
        description: 'Genre Model',
    })
    genres: Genre[];

    @Field(() => Media, {
        description: 'Media type',
        nullable: true,
    })
    media_type: MediaPrisma;
}
