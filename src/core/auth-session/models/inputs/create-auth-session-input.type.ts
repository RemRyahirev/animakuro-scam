import { ArgsType, Field, ID } from '@nestjs/graphql';
import {
    IsBoolean,
    IsIP,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';

@ArgsType()
export class CreateAuthSessionInputType {
    @IsString()
    @Field(() => String, {
        description: 'User agent',
    })
    agent: string;

    @IsIP()
    @Field(() => String, {
        description: 'IP',
    })
    ip: string;

    @IsBoolean()
    @Field(() => Boolean, {
        description: 'Active state',
    })
    active: boolean;

    @IsUUID(4)
    @Field(() => ID, {
        description: 'User ID used session',
    })
    user_id: string;
}
