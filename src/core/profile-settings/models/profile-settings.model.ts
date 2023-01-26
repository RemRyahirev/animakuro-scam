import { UserProfile } from '../../user-profile/models/user-profile.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Gender,
    ProfileCountries,
    ProfileLanguages,
    ProfileType,
    SiteTheme,
    SubscribeTier,
} from '../../../common/models/enums';
import { Integration } from './integration.model';
import { Notifications } from './notifications.model';

@ObjectType()
export class ProfileSettings {
    @Field(() => ID, {
        description: 'Unique ID of the profile-settings',
    })
    id: string;

    @Field(() => UserProfile, {
        description: 'User Profile Model',
    })
    profile: UserProfile;

    @Field(() => ID, {
        description: 'Unique ID of the profile',
    })
    profile_id: string;

    @Field(() => String, {
        description: 'Displayed name in profile',
        nullable: true,
    })
    displayed_name: string;

    @Field(() => Gender, {
        description: 'Gender of user',
    })
    gender: Gender;

    @Field(() => Date, {
        description: 'Birthday of user',
        nullable: true,
    })
    birthday: Date;

    @Field(() => SiteTheme, {
        description: 'Site theme of profile',
    })
    site_theme: SiteTheme;

    @Field(() => ID, {
        description: 'Avatar of profile',
        nullable: true,
    })
    avatar_id: string;

    @Field(() => ID, {
        description: 'Cover of profile',
        nullable: true,
    })
    cover_id: string;

    @Field(() => ProfileCountries, {
        description: 'Profile country',
    })
    country: ProfileCountries;

    @Field(() => ProfileLanguages, {
        description: 'Profile language',
    })
    language: ProfileLanguages;

    @Field(() => String, {
        description: 'Profile Timezone',
        nullable: true,
    })
    timezone: string;

    @Field(() => ProfileType, {
        description: 'Type of profile',
    })
    profile_type: ProfileType;

    @Field(() => [Integration], {
        description: 'Integrations of profile in JSON format',
        nullable: true,
    })
    integrations: Integration[];

    @Field(() => Notifications, { nullable: true })
    notifications: Notifications;

    @Field(() => SubscribeTier, {
        description: 'Type of profile subscription',
    })
    subscribe_tier: SubscribeTier;

    @Field(() => Date, {
        description: 'Setting updated at',
    })
    updated_at: Date;
}
