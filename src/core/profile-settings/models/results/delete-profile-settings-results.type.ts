import { BaseResultsType } from '../../../../common/models/results';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProfileSettings } from '../profile-settings.model';

@ObjectType()
export class DeleteProfileSettingsResultsType extends BaseResultsType {
    @Field(() => ProfileSettings, {
        nullable: true,
        description: 'Profile settings delete',
    })
    profileSettings: ProfileSettings | null;
}
