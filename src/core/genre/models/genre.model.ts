import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Genre {
    @Field(() => ID, {
        description: 'Unique ID of the genre',
    })
    id?: string;

    @Field(() => Boolean, {
        description: 'Favourite anime',
        defaultValue: false,
    })
    is_favourite?: boolean;

    @Field(() => String, {
        description: 'Name of the genre',
    })
    name: string;

    @Field(() => String, {
        description: 'Description of the genre',
        nullable: true,
    })
    description?: string | null;
}
