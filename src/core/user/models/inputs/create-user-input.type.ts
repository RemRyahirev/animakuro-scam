import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
    Length,
} from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateUserInputType {
    @Field(() => String)
    @Length(1, 64)
    username: string;

    @Field(() => String)
    @Length(1, 320)
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsString()
    @Length(1, 255)
    password: string;

    @IsBoolean()
    @Field(() => Boolean)
    is_email_confirmed: boolean;

    @IsOptional()
    @Field(() => String, { nullable: true })
    avatar?: string | null;
}
