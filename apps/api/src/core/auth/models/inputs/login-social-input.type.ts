import { IsEnum, Length } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { AuthType } from '@app/common/models/enums';

@ArgsType()
export class LoginSocialInputType {
    @Length(1, 320)
    @Field(() => String)
    access_token: string;

    @IsEnum(AuthType)
    @Field(() => AuthType)
    auth_type: AuthType;
}
