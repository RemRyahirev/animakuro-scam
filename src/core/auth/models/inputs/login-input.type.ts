import { Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class LoginInputType {
    @Field(() => String)
    @Length(1, 64)
    username: string;

    @Field(() => String)
    @Length(1, 255)
    password: string;
}
