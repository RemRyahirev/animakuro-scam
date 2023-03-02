import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnimeType, FolderType } from '@prisma/client';

// {"folder": {
//          "id": {"809d1892-92fc-421d-9889-10e4be311057": 1},
//          "type": {"COMPLETED": 1},
//          "total": 1},
//  "favorites": {"anime": 1, "collection": 1},
//  "viewedAnime": {
//          "type": {"ANIME": 0, "MANGA": 1},
//          "genre": {"4f02be8b-cafb-4f1d-baa8-c34279b1def1": 1}}}

@ObjectType()
export class UserFolderStatistic {
    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'user_folder.id in keys, amount of anime in folder in value'
    })
    id?: Record<string, number>;

    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'FolderType in keys, amount of anime in user folder in value'
    })
    type?: Record<FolderType, number>;

    @Field(() => Int, {
        nullable: true,
        description: 'Amount of anime in all user folders',
    })
    total?: number;

    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'genre.id in keys, amount of animes in genres in value',
    })
    genre?: Record<string, number>;

    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'studio.id in keys, amount of animes in studios in value',
    })
    studio?: Record<string, number>;
}

@ObjectType()
export class UserFavoritesStatistic {
    @Field(() => Int, {
        nullable: true,
        description: 'Amount of anime that marked by user as favorite',
    })
    anime?: number;

    @Field(() => Int, {
        nullable: true,
        description: 'Amount of collection that marked by user as favorite',
    })
    collection?: number;
}

@ObjectType()
export class UserViewedAnimeStatistic {
    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'AnimeType in keys, amount of viewed anime of this type in value'
    })
    type?: Record<AnimeType, number>;

    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'genre.id in keys, amount of viewed anime of this genre in value'
    })
    genre?: Record<string, number>;

    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'studio.id in keys, amount of viewed anime of this studio in value',
    })
    studio?: Record<string, number>;
}

@ObjectType()
export class UserStatistics {
    @Field(() => UserFolderStatistic, {
        nullable: true,
        description: 'User folders data'
    })
    folder?: UserFolderStatistic;

    @Field(() => UserFavoritesStatistic, {
        nullable: true,
        description: 'User favorites data',
    })
    favorites?: UserFavoritesStatistic;

    @Field(() => UserViewedAnimeStatistic, {
        nullable: true,
        description: 'User viewed anime data',
    })
    viewedAnime?: UserViewedAnimeStatistic;
}
