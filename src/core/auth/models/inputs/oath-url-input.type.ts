import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum } from '@nestjs/class-validator';
import { AuthType } from '../../../../common/models/enums';

@ArgsType()
export class OathUrlInputType {
    @Field(() => AuthType)
    @IsEnum(AuthType)
    auth_type: AuthType;
}
