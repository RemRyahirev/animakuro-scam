import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';
import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    Length,
    ValidateNested,
} from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { SubscribeTier } from '@app/common/models/enums';

import { NotificationsInputType } from '../notifications.model';

import { notificationsDefault } from './defaults/notifications.default';

@ArgsType()
export class CreateUserArgsType {
    @Field(() => String)
    @Length(1, 64)
    username: string;

    @Field(() => String)
    @Length(1, 320)
    @IsEmail()
    email: string;

    @Field(() => String)
    @IsString()
    @Length(1, 255)
    password: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    avatar?: string | null;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => NotificationsInputType)
    @Field(() => NotificationsInputType, {
        defaultValue: notificationsDefault,
    })
    notifications: NotificationsInputType;

    @IsOptional()
    @IsEnum(SubscribeTier)
    @Field(() => SubscribeTier, { defaultValue: SubscribeTier.FREE_ACCOUNT })
    subscribe_tier: SubscribeTier;
}
