import { ComparePassword, EntityExists } from '../../../../common/decorators';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, Length } from "@nestjs/class-validator";
import { AuthType } from "../../../../common/models/enums";

@ArgsType()
export class LoginSocialInputType {
    @Field(() => String)
    @Length(1, 320)
    access_token: string;

    @Field(() => AuthType)
    @IsEnum(AuthType)
    auth_type: AuthType;
}
