import { IsEmail, IsString, Length } from '@nestjs/class-validator';
import { ArgsType } from '@nestjs/graphql';

import { AccountLimit, Unique } from '@app/common/decorators';

@ArgsType()
export class RegisterArgsType {
    @Length(1, 64)
    @Unique({
        message: 'This username is already in use',
    })
    username: string;

    @Length(1, 320)
    @IsEmail()
    @AccountLimit({
        message: 'Account limit for this email exceeded',
    })
    email: string;

    @IsString()
    @Length(8, 255)
    password: string;
}
