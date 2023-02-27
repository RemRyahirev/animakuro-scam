import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { ProfileSettings } from '../profile-settings.model';

@ObjectType()
export class UpdateProfileSettingsResultsType extends BaseResultsType {
    @Field(() => ProfileSettings, {
        nullable: true,
        description: 'Profile settings update',
    })
    profileSettings: ProfileSettings | null;
}
