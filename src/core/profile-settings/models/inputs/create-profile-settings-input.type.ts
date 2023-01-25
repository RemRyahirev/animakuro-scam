import { IsDate, IsEnum, IsString } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
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
import { IsArray, IsUUID, Length } from 'class-validator';
import { Integration } from '../integration.model';

@ArgsType()
export class CreateProfileSettingsInputType {
    @IsUUID()
    @Field(() => String)
    profile_id: string;

    @IsString()
    @Field(() => String, { nullable: true })
    displayed_name: string;

    @IsEnum(Gender)
    @Field(() => Gender, { nullable: true, defaultValue: Gender.UNSPECIFIED })
    gender: GenderPrisma;

    @IsDate()
    @Field(() => Date, { nullable: true })
    birthday: Date;

    @IsEnum(SiteTheme)
    @Field(() => SiteTheme, { defaultValue: SiteTheme.AUTO })
    site_theme: SiteThemePrisma;

    @IsString()
    @Field(() => String, { nullable: true })
    avatar: string;

    @IsString()
    @Field(() => String, { nullable: true })
    cover: string;

    @IsEnum(ProfileCountries)
    @Field(() => ProfileCountries, { nullable: true })
    country: ProfileCountriesPrisma;

    @IsEnum(ProfileLanguages)
    @Field(() => ProfileLanguages, { nullable: true })
    language: ProfileLanguagesPrisma;

    @IsString()
    @Length(1, 10)
    @Field(() => String, { nullable: true })
    timezone: string;

    @IsEnum(ProfileType)
    @Field(() => ProfileType, { defaultValue: ProfileType.PUBLIC })
    profile_type: ProfileTypePrisma;

    @IsArray()
    @Field(() => [Integration], { nullable: true })
    integrations: string[];

    @IsEnum(SubscribeTier)
    @Field(() => SubscribeTier, { defaultValue: SubscribeTier.FREE_ACCOUNT })
    subscribe_tier: SubscribeTierPrisma;
}
