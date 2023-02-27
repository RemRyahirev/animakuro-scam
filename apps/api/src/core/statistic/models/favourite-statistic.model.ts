import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Anime } from '../../anime/models/anime.model';
import { Character } from '../../character/models/character.model';
import { Author } from '../../author/models/author.model';
import { Genre } from '../../genre/models/genre.model';
import { Studio } from '../../studio/models/studio.model';

@ObjectType()
class FavouriteAnimesStatistic {
    @Field(() => [Anime], { nullable: true })
    favourite: Anime[] | null;

    @Field(() => Int, { nullable: true })
    count: number;
}

@ObjectType()
class FavouriteAuthorsStatistic {
    @Field(() => [Author], { nullable: true })
    favourite: Author[] | null;

    @Field(() => Int, { nullable: true })
    count: number;
}
@ObjectType()
class FavouriteCharactersStatistic {
    @Field(() => [Character], { nullable: true })
    favourite: Character[] | null;

    @Field(() => Int, { nullable: true })
    count: number;
}
@ObjectType()
class FavouriteGenresStatistic {
    @Field(() => [Genre], { nullable: true })
    favourite: Genre[] | null;

    @Field(() => Int, { nullable: true })
    count: number;
}
@ObjectType()
class FavouriteStudiosStatistic {
    @Field(() => [Studio], { nullable: true })
    favourite: Studio[] | null;

    @Field(() => Int, { nullable: true })
    count: number;
}

@ObjectType()
export class UserStatisticFavourite {
    @Field(() => FavouriteAuthorsStatistic)
    favourite_authors: FavouriteAuthorsStatistic | null;

    @Field(() => FavouriteAnimesStatistic)
    favourite_animes: FavouriteAnimesStatistic | null;

    @Field(() => FavouriteCharactersStatistic)
    favourite_characters: FavouriteCharactersStatistic | null;

    @Field(() => FavouriteGenresStatistic)
    favourite_genres: FavouriteGenresStatistic | null;

    @Field(() => FavouriteStudiosStatistic)
    favourite_studios: FavouriteStudiosStatistic | null;
}
