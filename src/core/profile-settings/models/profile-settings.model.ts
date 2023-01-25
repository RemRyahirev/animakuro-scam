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
    })
    displayed_name: string;

    @Field(() => Gender, {
        description: 'Gender of user',
    })
    gender: Gender;

    @Field(() => Date, {
        description: 'Birthday of user',
    })
    birthday: Date;

    @Field(() => SiteTheme, {
        description: 'Site theme of profile',
    })
    site_theme: SiteTheme;

    @Field(() => String, {
        description: 'Avatar of profile',
    })
    avatar: string;

    @Field(() => String, {
        description: 'Cover of profile',
    })
    cover: string;

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
    })
    timezone: string;

    @Field(() => ProfileType, {
        description: 'Type of profile',
    })
    profile_type: ProfileType;

    @Field(() => [Integration], {
        description: 'Integrations of profile in JSON format',
    })
    integrations: Integration[];

    @Field(() => SubscribeTier, {
        description: 'Type of profile subscription',
    })
    subscribe_tier: SubscribeTier;

    @Field(() => Date, {
        description: 'Setting updated at',
    })
    updated_at: Date;
}
