import { Type } from 'class-transformer';
import { IsArray, IsObject, IsUUID, Length } from 'class-validator';
import {
    IsBoolean,
    IsDate,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import {
    Gender as GenderPrisma,
    ProfileCountries as ProfileCountriesPrisma,
    ProfileLanguages as ProfileLanguagesPrisma,
    ProfileType as ProfileTypePrisma,
    SiteTheme as SiteThemePrisma,
    SubscribeTier as SubscribeTierPrisma,
    ModeratorRoles as ModeratorRolesPrisma,
} from '@prisma/client';

import {
    Gender,
    ModeratorRoles,
    ProfileCountries,
    ProfileLanguages,
    ProfileType,
    SiteTheme,
    SubscribeTier,
} from '@app/common/models/enums';

import { Integration } from '../integration.model';
import { Notifications } from '../notifications.model';

import { notificationsDefault } from './defaults/notifications.default';

@ArgsType()
export class CreateProfileSettingsInputType {
    @IsUUID()
    @Field(() => String)
    profile_id: string;

    @IsOptional()
    @IsString()
    @Length(1, 30)
    @Field(() => String, { nullable: true })
    displayed_name: string;

    @IsOptional()
    @IsEnum(Gender)
    @Field(() => Gender, { nullable: true, defaultValue: Gender.UNSPECIFIED })
    gender: GenderPrisma;

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    birthday: Date;

    @IsOptional()
    @IsEnum(SiteTheme)
    @Field(() => SiteTheme, { defaultValue: SiteTheme.AUTO })
    site_theme: SiteThemePrisma;

    @IsOptional()
    @IsString()
    @IsUUID()
    @Field(() => ID, { nullable: true })
    avatar_id: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    @Field(() => ID, { nullable: true })
    cover_id: string;

    @IsOptional()
    @IsEnum(ProfileCountries)
    @Field(() => ProfileCountries, { nullable: true })
    country: ProfileCountriesPrisma;

    @IsOptional()
    @IsEnum(ProfileLanguages)
    @Field(() => ProfileLanguages, { nullable: true })
    language: ProfileLanguagesPrisma;

    @IsOptional()
    @IsString()
    @Length(1, 7)
    @Field(() => String, { nullable: true })
    timezone: string;

    @IsOptional()
    @IsEnum(ProfileType)
    @Field(() => ProfileType, { defaultValue: ProfileType.PUBLIC })
    profile_type: ProfileTypePrisma;

    @IsOptional()
    @IsEnum(ModeratorRoles)
    @Field(() => ModeratorRoles, { defaultValue: ModeratorRoles.VIEWER })
    moderator_role: ModeratorRolesPrisma;

    @IsOptional()
    @IsBoolean()
    @Field(() => Boolean, { defaultValue: false })
    is_blocked: boolean;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    about: string;

    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => Integration)
    @Field(() => [Integration], { defaultValue: [] })
    integrations: string[];

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Notifications)
    @Field(() => Notifications, {
        defaultValue: notificationsDefault,
    })
    notifications: object;

    @IsOptional()
    @IsEnum(SubscribeTier)
    @Field(() => SubscribeTier, { defaultValue: SubscribeTier.FREE_ACCOUNT })
    subscribe_tier: SubscribeTierPrisma;
}
