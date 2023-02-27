import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FolderType } from '@prisma/client';

@ObjectType()
export class AnimeStatistics {
    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'FolderType in keys, amount of anime in user folders in value'
    })
    folder?: Record<FolderType, number>;

    @Field(() => Int, {
        nullable: true,
        description: 'Amount of users that marked this anime as favorite',
    })
    favorites?: number;

    @Field(() => Int, {
        nullable: true,
        description: 'Amount of requests to this anime',
    })
    requests?: number;

    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description: 'Rates from 1 to 5 in keys, amount of users that rate like this in values',
    })
    userRating?: { 1: number, 2: number, 3: number, 4: number, 5: number };
}
