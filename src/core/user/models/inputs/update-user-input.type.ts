import { GraphQLUpload } from 'graphql-upload';
import {
    IsEmail,
    IsOptional,
    IsString, IsUUID,
    Length,
    ValidateIf
} from "class-validator";
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { Gender } from '../../../../common/models/enums';
import { IUpload } from '../../../../common/models/interfaces';
import { IsDate, IsEnum } from "@nestjs/class-validator";

@ArgsType()
export class UpdateUserInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    @Length(1, 64)
    username?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    @Length(1, 320)
    @IsEmail()
    email?: string;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    is_email_confirmed?: boolean;

    @IsOptional()
    @IsString()
    @ValidateIf((o) => o.newPassword)
    @Field(() => String, { nullable: true })
    password?: string;

    @IsOptional()
    @IsString()
    @ValidateIf((o) => o.password)
    @Field(() => String, { nullable: true })
    newPassword?: string;

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    birthday?: Date;

    @IsOptional()
    @IsEnum(Gender)
    @Field(() => Gender, { nullable: true })
    gender?: Gender;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    avatar?: IUpload;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    banner?: IUpload;
}
