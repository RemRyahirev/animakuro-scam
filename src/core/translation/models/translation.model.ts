import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Translation {
    @Field(() => ID, {
        description: 'Unique ID of the language',
    })
    id?: string;

    @Field(() => String, {
        description: 'Chosen language',
    })
    language: string;

    @Field(() => String, {
        description: 'Translation into the chosen language',
    })
    translation: string;
}
