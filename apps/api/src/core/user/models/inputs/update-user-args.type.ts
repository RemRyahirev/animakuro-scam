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

import { NotificationsInputType } from '../notifications.model';

import { notificationsDefault } from './defaults/notifications.default';

@ArgsType()
export class UpdateUserArgsType {
    @IsOptional()
    @IsUUID()
    @Field(() => ID)
    id?: string;

    @IsOptional()
    @Length(1, 64)
    username?: string;

    @IsOptional()
    @Length(1, 320)
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @ValidateIf((o) => o.newPassword)
    password?: string;

    @IsOptional()
    @IsString()
    @ValidateIf((o) => o.password)
    newPassword?: string;

    @IsOptional()
    avatar?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => NotificationsInputType)
    @Field({ defaultValue: notificationsDefault })
    notifications: NotificationsInputType;

    @IsOptional()
    @IsEnum(SubscribeTier)
    @Field(() => SubscribeTier)
    subscribe_tier: SubscribeTier;
}
