import { AccountLimit, Unique } from '../../../../common/decorators';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from '@nestjs/class-validator';

@ArgsType()
export class RegisterInputType {
    @Field(() => String)
    @Length(1, 64)
    @Unique({
        message: 'This username is already in use',
    })
    username: string;

    @Field(() => String)
    @Length(1, 320)
    @IsEmail()
    @AccountLimit({
        message: 'Account limit for this email exceeded',
    })
    email: string;

    @Field(() => String)
    @IsString()
    @Length(1, 255)
    password: string;
}
