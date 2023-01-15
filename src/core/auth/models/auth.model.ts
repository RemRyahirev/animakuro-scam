import { Field, ObjectType } from '@nestjs/graphql';
import { AuthType } from '../../../common/models/enums';

@ObjectType()
export class Auth {
    @Field(() => AuthType)
    type: AuthType;

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
