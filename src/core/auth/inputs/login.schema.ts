import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
    @Field(() => String)
    @Length(1, 64)
    username = undefined as any as string;

    @Field(() => String)
    @Length(1, 255)
    password = undefined as any as string;
}
