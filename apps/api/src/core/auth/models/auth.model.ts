import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
    @Field(() => String, {
        description: 'Auth type - maybe "JWT" | "GOOGLE" | "DISCORD" | "APPLE" | "FACEBOOK"'
    })
    type: string;

    @Field(() => String, { description: 'oauth authorization id' })
    uuid: string;

    @Field(() => String, { nullable: true,
        description: 'Email from oauth account'
    })
    email: string;

    @Field(() => String, { nullable: true,
        description: 'First name from oauth account' })
    first_name: string;

    @Field(() => String, { nullable: true,
        description: 'Last name from oauth account' })
    last_name: string;

    @Field(() => String, { nullable: true,
        description: 'Avatar url from oauth account' })
    avatar: string;
}
