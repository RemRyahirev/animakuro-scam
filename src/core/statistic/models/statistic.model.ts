import { Field, ObjectType } from '@nestjs/graphql';
import { UserFolder } from '../../user-folder/models/user-folder.model';
import { Anime } from '../../anime/models/anime.model';
import { Character } from '../../character/models/character.model';
import { Author } from '../../author/models/author.model';
import { Genre } from '../../genre/models/genre.model';
import { Studio } from '../../studio/models/studio.model';


@ObjectType()
export class UserStatisticFolder {
    @Field(() => UserFolder)
    folder: UserFolder;

    @Field()
    count: number;
}


@ObjectType()
export class UserStatisticFavourite {
    @Field(() => [Author])
    favourite_authors: {
        author: Author[];
        count: number;
    };

    @Field(() => [Anime])
    favourite_animes: {
        anime: Anime[];
        count: number;
    };

    @Field(() => [Character])
    favourite_characters: {
        character: Character[];
        count: number;
    };

    @Field(() => [Genre])
    favourite_genres: {
        genre: Genre[];
        count: number;
    };

    @Field(() => [Studio])
    favourite_studios: {
        studio: Studio[];
        count: number;
    };
}
