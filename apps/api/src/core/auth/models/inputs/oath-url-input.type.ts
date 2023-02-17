import { IsEnum } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { AuthType } from '@app/common/models/enums';

@ArgsType()
export class OathUrlInputType {
    @Field(() => AuthType)
    @IsEnum(AuthType)
    auth_type: AuthType;
}
