import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Translation {
    @Field(() => ID)
    id?: string;

    @Field(() => String)
    language: string;

    @Field(() => String)
    translation: string;
}
