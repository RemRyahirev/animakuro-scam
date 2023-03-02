import { Type } from 'class-transformer';
import { IsArray, Length } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {
    IsBoolean,
    IsDate,
    IsEnum,
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
} from '@app/common/models/enums';

import { User } from '../../../user/models/user.model';
import { UserFolder } from '../../../user-folder/models/user-folder.model';
import { Integration } from '../integration.model';

@ArgsType()
export class UpdateUserProfileInputType {
    @IsUUID()
    @Field(() => ID)
    id?: string;

    @IsOptional() // нужны ли эти поля здесь в принципе + будем ли редактировать ссылки на связанные таблицы?
    user?: User; // такое поле в GraphQL отсутствует!

    @IsOptional() // нужны ли эти поля здесь в принципе + будем ли редактировать ссылки на связанные таблицы?
    userFolder?: UserFolder; // такое поле в GraphQL отсутствует!
    // не добавить ли вместо них userId и userAnimeId ?!??!

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
    @Field(() => String)
    displayed_name: string;

    @IsOptional()
    @IsEnum(Gender)
    @Field(() => Gender)
    gender: Gender;

    @IsOptional()
    @IsDate()
    @Field(() => Date)
    birthday: Date;

    @IsOptional()
    @IsEnum(SiteTheme)
    @Field(() => SiteTheme)
    site_theme: SiteTheme;

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
    country: ProfileCountries;

    @IsOptional()
    @IsEnum(ProfileLanguages)
    @Field(() => ProfileLanguages)
    language: ProfileLanguages;

    @IsOptional()
    @IsString()
    @Length(1, 10)
    @Field(() => String)
    timezone: string;

    @IsOptional()
    @IsEnum(ProfileType)
    @Field(() => ProfileType)
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
