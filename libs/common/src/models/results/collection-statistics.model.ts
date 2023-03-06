import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CollectionStatistics {
    @Field(() => Int, {
        nullable: true,
        description: 'Amount of users that marked this collection as favorite',
    })
    favorites?: number;

    @Field(() => GraphQLJSONObject, {
        nullable: true,
        description:
            'Rates from 1 to 5 in keys, amount of users that rate like this in values',
    })
    userRating?: { 1: number; 2: number; 3: number; 4: number; 5: number };

    @Field(() => Float, {
        nullable: true,
        description:
            'Score rating by User_Collection',
    })
    score?: number;
}
