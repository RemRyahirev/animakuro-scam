import {
    IsDate,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import {
    Gender,
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
} from '@prisma/client';
import { IsArray, IsObject, IsUUID, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { Integration } from '../integration.model';
import { notificationsDefault } from './defaults/notifications.default';
import { Notifications } from '../notifications.model';

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
    @IsArray()
    @ValidateNested()
    @Type(() => Integration)
    @Field(() => [Integration], { nullable: true, defaultValue: [] })
    integrations: string[];

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Notifications)
    @Field(() => Notifications, { defaultValue: notificationsDefault })
    notifications: object;

    @IsOptional()
    @IsEnum(SubscribeTier)
    @Field(() => SubscribeTier, { defaultValue: SubscribeTier.FREE_ACCOUNT })
    subscribe_tier: SubscribeTierPrisma;
}
