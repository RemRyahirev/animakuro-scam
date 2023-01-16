import { ArgsType, Field } from '@nestjs/graphql';
import { AuthType } from '../../../../common/models/enums';
import { IsOptional } from "@nestjs/class-validator";

@ArgsType()
export class AuthInputType {
    @Field(() => String, { description: 'Third party account id' })
    uuid: string | undefined;

    @Field(() => AuthType)
    type: AuthType;

    @IsOptional()
    @Field({ nullable: true })
    firstName?: string;

    @IsOptional()
    @Field({ nullable: true })
    lastName?: string;

    @IsOptional()
    @Field({ nullable: true })
    email?: string;

    @IsOptional()
    @Field({ nullable: true })
    avatar?: string;
}
