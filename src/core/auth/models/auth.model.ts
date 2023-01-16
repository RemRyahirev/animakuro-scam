import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
    @Field(() => String)
    type: string;

    @Field(() => String)
    uuid: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    first_name: string;

    @Field({ nullable: true })
    last_name: string;

    @Field({ nullable: true })
    avatar: string;
}
