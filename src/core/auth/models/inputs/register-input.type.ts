import { IsEmail, IsString, Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { AccountLimit, Unique } from '../../../../common/decorators';

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
