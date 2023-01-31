import { ProfileSettings } from '../../profile-settings/models/profile-settings.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { Anime } from '../../anime/models/anime.model';
import { Character } from '../../character/models/character.model';
import { Author } from '../../author/models/author.model';
import { Studio } from '../../studio/models/studio.model';
import { Genre } from '../../genre/models/genre.model';
import { ProfileFolder } from '../../profile-folder/models/profile-folder.model';

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

    @Field(() => ProfileSettings)
    profile_settings: ProfileSettings;

    @Field(() => [ProfileFolder])
    profile_folders: ProfileFolder[];
}
