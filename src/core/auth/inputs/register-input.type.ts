import { IsEmail, IsString, Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class RegisterInputType {
    @Field(() => String)
    @Length(1, 64)
    username: string;

    @Field(() => String)
    @Length(1, 320)
    @IsString()
    @IsEmail()
    email: string;

    @Field(() => String)
    @Length(1, 255)
    password: string;
}
