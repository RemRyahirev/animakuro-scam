import {
    IsBoolean,
    IsDate,
    IsEnum,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import {
    Gender,
    ModeratorRoles,
    ProfileCountries,
    ProfileLanguages,
    ProfileType,
    SiteTheme,
    SubscribeTier,
} from '../../../../common/models/enums';
import {
    Gender as GenderPrisma,
    ProfileCountries as ProfileCountriesPrisma,
    ProfileLanguages as ProfileLanguagesPrisma,
    ProfileType as ProfileTypePrisma,
    SiteTheme as SiteThemePrisma,
    SubscribeTier as SubscribeTierPrisma,
    ModeratorRoles as ModeratorRolesPrisma,
} from '@prisma/client';
import { IsArray, Length } from 'class-validator';
import { Integration } from '../integration.model';
import { Type } from 'class-transformer';
import { notificationsDefault } from './defaults/notifications.default';
import { Notifications } from '../notifications.model';

@ArgsType()
export class UpdateProfileSettingsInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Field(() => String)
    displayed_name: string;

    @IsOptional()
    @IsEnum(Gender)
    @Field(() => Gender)
    gender: GenderPrisma;

    @IsOptional()
    @IsDate()
    @Field(() => Date)
    birthday: Date;

    @IsOptional()
    @IsEnum(SiteTheme)
    @Field(() => SiteTheme)
    site_theme: SiteThemePrisma;

    @IsOptional()
    @IsString()
    @IsUUID()
    @Field(() => ID)
    avatar_id: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    @Field(() => ID)
    cover_id: string;

    @IsOptional()
    @IsEnum(ProfileCountries)
    @Field(() => ProfileCountries)
    country: ProfileCountriesPrisma;

    @IsOptional()
    @IsEnum(ProfileLanguages)
    @Field(() => ProfileLanguages)
    language: ProfileLanguagesPrisma;

    @IsOptional()
    @IsString()
    @Length(1, 10)
    @Field(() => String)
    timezone: string;

    @IsOptional()
    @IsEnum(ProfileType)
    @Field(() => ProfileType)
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
    @Field(() => Notifications, { defaultValue: notificationsDefault })
    notifications: object;

    @IsOptional()
    @IsEnum(SubscribeTier)
    @Field(() => SubscribeTier)
    subscribe_tier: SubscribeTierPrisma;
}
