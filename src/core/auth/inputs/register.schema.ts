import { IsEmail, IsString, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterInput {
    @Field(() => String)
    @Length(1, 64)
    username = undefined as any as string;

    @Field(() => String)
    @Length(1, 320)
    @IsString()
    @IsEmail()
    email = undefined as any as string;

    @Field(() => String)
    @Length(1, 255)
    password = undefined as any as string;
}
