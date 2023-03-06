import { IsEnum } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { AuthType } from '@app/common/models/enums';

@ArgsType()
export class OathUrlArgsType {
    @IsEnum(AuthType)
    @Field(() => AuthType)
    auth_type: AuthType;
}
