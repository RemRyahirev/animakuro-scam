import { Length } from '@nestjs/class-validator';
import { ArgsType } from '@nestjs/graphql';

import { ComparePassword, EntityExists } from '@app/common/decorators';

@ArgsType()
export class LoginArgsType {
    @Length(1, 64)
    @EntityExists({ message: 'User not found' })
    username: string;

    @Length(1, 255)
    @ComparePassword({ message: 'Invalid password' })
    password: string;
}
