import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthSession {
    @Field(() => ID, {
        description: 'Unique ID of the auth session',
    })
    id: string;

    @Field(() => String, {
        description: 'User agent',
    })
    agent: string;

    @Field(() => String, {
        description: 'IP',
    })
    ip: string;

    @Field(() => Boolean, {
        description: 'Active state',
    })
    active: boolean;

    @Field(() => ID, {
        description: 'User ID used session',
    })
    user_id: string;
}
