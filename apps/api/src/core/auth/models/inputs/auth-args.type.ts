import { IsOptional } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { AnimeStillsType, AuthType } from '@app/common/models/enums';

@ArgsType()
export class AuthArgsType {
    /**
     * Third party account id
     */
    uuid?: string;

    @Field(() => AuthType)
    type: AuthType;

    @IsOptional()
    firstName?: string;

    @IsOptional()
    lastName?: string;

    @IsOptional()
    email?: string;

    @IsOptional()
    avatar?: string;
}
