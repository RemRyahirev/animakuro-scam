import { Field, ObjectType } from '@nestjs/graphql';

import {
    BaseResultsType,
    PaginationResultsType,
} from '@app/common/models/results';

import { ProfileSettings } from '../profile-settings.model';

@ObjectType()
export class GetListProfileSettingsResultsType extends BaseResultsType {
    @Field(() => [ProfileSettings], {
        nullable: true,
        description: 'Profile Settings list',
    })
    userProfileList: ProfileSettings[];

    @Field(() => PaginationResultsType, {
        nullable: false,
        description: 'Pagination data',
    })
    pagination: PaginationResultsType;
}
