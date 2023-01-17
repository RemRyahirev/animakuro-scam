import { IsBoolean, IsDate, IsEmail, IsEnum, IsOptional, IsString, Length } from "@nestjs/class-validator";
import { ArgsType, Field } from '@nestjs/graphql';
import { Gender } from '../../../../common/models/enums';

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
    @IsDate()
    @Field(() => Date, { nullable: true })
    birthday?: Date | null;

    @IsOptional()
    @Field(() => String, { nullable: true })
    avatar?: string | null;

    @IsEnum(Gender)
    @Field(() => Gender)
    gender: Gender;
}
