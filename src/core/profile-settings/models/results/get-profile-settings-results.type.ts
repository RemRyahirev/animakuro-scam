import { ProfileSettings } from '../profile-settings.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';

@ObjectType()
export class GetProfileSettingsByIdResultsType extends BaseResultsType {
    @Field(() => ProfileSettings, {
        nullable: true,
        description: 'Profile settings by id',
    })
    profileSettings: ProfileSettings | null;
}
