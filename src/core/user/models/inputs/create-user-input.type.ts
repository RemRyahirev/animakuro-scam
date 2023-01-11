import { IsDate, IsEmail, IsOptional, IsString, Length } from '@nestjs/class-validator';
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

    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    birthday?: Date;

    @IsOptional()
    @Field({ nullable: true })
    gender?: Gender;

    @IsOptional()
    @Field({ nullable: true })
    @Length(1, 64)
    customGender?: string;
}
