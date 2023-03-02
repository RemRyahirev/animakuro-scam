import { Type } from 'class-transformer';
import {
    IsEmail,
    IsOptional,
    IsString,
    IsUUID,
    Length,
    ValidateIf,
} from 'class-validator';
import { IsEnum, IsObject, ValidateNested } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

import { SubscribeTier } from '@app/common/models/enums';

import { Notifications } from '../notifications.model';

import { notificationsDefault } from './defaults/notifications.default';

@ArgsType()
export class UpdateUserInputType {
    @IsOptional()
    @IsUUID()
    @Field(() => ID, { nullable: true })
    id?: string;

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
    @Field(() => String, { nullable: true })
    avatar?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Notifications)
    @Field(() => Notifications, { defaultValue: notificationsDefault })
    notifications: object;

    @IsOptional()
    @IsEnum(SubscribeTier)
    @Field(() => SubscribeTier)
    subscribe_tier: SubscribeTier;
}
