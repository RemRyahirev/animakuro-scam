import { Type } from 'class-transformer';
import { IsArray, Length } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {
    IsBoolean,
    IsDate,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import {
    Gender,
    ModeratorRoles,
    ProfileCountries,
    ProfileLanguages,
    ProfileType,
    SiteTheme,
} from '@app/common/models/enums';

import { Integration } from '../integration.model';

@ArgsType()
// перечисляем, какие аргументы вводим в инпут GraphQL при запросе на создание
// в том числе обязательные и необязательные
// проработать эти поля!
export class CreateUserProfileInputType {
    @IsString()
    @Field()
    user_id: string;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    avatar?: Promise<FileUpload>;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    banner?: Promise<FileUpload>;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    cover?: Promise<FileUpload>;

    @IsOptional()
    @IsString()
    @Length(1, 30)
    @Field(() => String, { nullable: true })
    displayed_name: string;

    @IsOptional()
    @IsEnum(Gender)
    @Field(() => Gender, { nullable: true, defaultValue: Gender.UNSPECIFIED })
    gender: Gender;

    @IsOptional()
    @IsDate()
    @Field(() => Date, { nullable: true })
    birthday: Date;

    @IsOptional()
    @IsEnum(SiteTheme)
    @Field(() => SiteTheme, { defaultValue: SiteTheme.AUTO })
    site_theme: SiteTheme;

    @IsOptional()
    @IsEnum(ProfileCountries)
    @Field(() => ProfileCountries, { nullable: true })
    country: ProfileCountries;

    @IsOptional()
    @IsEnum(ProfileLanguages)
    @Field(() => ProfileLanguages, { nullable: true })
    language: ProfileLanguages;

    @IsOptional()
    @IsString()
    @Length(1, 7)
    @Field(() => String, { nullable: true })
    timezone: string;

    @IsOptional()
    @IsEnum(ProfileType)
    @Field(() => ProfileType, { defaultValue: ProfileType.PUBLIC })
    profile_type: ProfileType;

    @IsOptional()
    @IsEnum(ModeratorRoles)
    @Field(() => ModeratorRoles, { defaultValue: ModeratorRoles.VIEWER })
    moderator_role: ModeratorRoles;

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
}
