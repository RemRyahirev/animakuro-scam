import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Author {
    @Field(() => ID)
    id?: string;

    @Field(() => String)
    author_name: string;

    @Field(() => String)
    bucket_id: string;

    @Field(() => String)
    bio: string;

}
