import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field(() => ID, {
        description: 'Unique ID of the user',
    })
    id: string;

    @Field(() => String, {
        description: 'Username',
    })
    username: string;

    @Field(() => String, { nullable: true, description: 'Email of the user' })
    email: string | null;

    @Field(() => Boolean, {
        description: 'Email verified status of the user',
    })
    is_email_confirmed: boolean | null;

    @Field(() => String, { nullable: true, description: "Avatar (image) of the user" })
    avatar: string | null;
}
