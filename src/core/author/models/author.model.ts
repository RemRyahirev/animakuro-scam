import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Author {
    @Field(() => ID, {
        description: 'Unique ID of the author',
    })
    id?: string;

    @Field(() => String, {
        description: 'Name of the author of the media',
    })
    author_name: string;

    @Field(() => String)
    bucket_id: string;

    @Field(() => String, {
        description: 'Short biography of the author',
    })
    bio: string;
}
