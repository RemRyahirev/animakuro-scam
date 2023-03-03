import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnimeType, FolderType } from '@prisma/client';

@ObjectType()
export class ProfileFolderStatistic {
    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'user_folder.id in keys, amount of anime in folder in value'
    })
    id?: Record<string, number>;

    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'FolderType in keys, amount of anime in profile folder in value'
    })
    type?: Record<FolderType, number>;

    @Field(() => Int, {
        nullable: true,
        description: 'Amount of anime in all profile folders',
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
export class ProfileFavoritesStatistic {
    @Field(() => Int, {
        nullable: true,
        description: 'Amount of anime that marked by profile as favorite',
    })
    anime?: number;

    @Field(() => Int, {
        nullable: true,
        description: 'Amount of collection that marked by user as favorite',
    })
    collection?: number;
}

@ObjectType()
export class ProfileViewedAnimeStatistic {
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
export class ProfileStatistics {
    @Field(() => ProfileFolderStatistic, {
        nullable: true,
        description: 'Profile folders data'
    })
    folder?: ProfileFolderStatistic;

    @Field(() => ProfileFavoritesStatistic, {
        nullable: true,
        description: 'Profile favorites data',
    })
    favorites?: ProfileFavoritesStatistic;

    @Field(() => ProfileViewedAnimeStatistic, {
        nullable: true,
        description: 'Profile viewed anime data',
    })
    viewedAnime?: ProfileViewedAnimeStatistic;

    @Field(() => Int, {
        nullable: true,
        description: 'Amount of requests to this profile',
    })
    requests?: number;
}
