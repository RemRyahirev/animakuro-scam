import {
    IsBoolean,
    IsIP,
    IsString,
    IsUUID,
} from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class CreateAuthSessionArgsType {
    /**
     * User agent
     */
    @IsString()
    agent: string;

    /**
     * IP
     */
    @IsIP()
    ip: string;

    /**
     * Active state
     */
    @IsBoolean()
    active: boolean;

    /**
     * User ID used session
     */
    @IsUUID(4)
    @Field(() => ID)
    user_id: string;
}
