import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Opening {
    @Field(() => ID, {
        description: 'Unique ID of the opening',
    })
    id: string;

    @Field(() => String, {
        description: 'Url to opening'
    })
    url: string;

    @Field(() => String, {
        description: 'Name of the opening'
    })
    name: string;

    @Field(() => String, {
        description: 'Author\'s name'
    })
    author_name: string;

    @Field(() => Int, {
        description: 'Start with'
    })
    episode_start: number;

    @Field(() => Int, {
        description: 'End by'
    })
    episode_end: number
}