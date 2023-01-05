import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Genre {
    @Field(() => ID, {
        description: 'Unique ID of the genre',
    })
    id?: string;

    @Field(() => String, {
        description: 'Name of the genre',
    })
    genre_name: string;
}
