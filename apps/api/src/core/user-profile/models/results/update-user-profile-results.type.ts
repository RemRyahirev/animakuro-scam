import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { UserProfile } from '../user-profile.model';

@ObjectType()
export class UpdateUserProfileResultsType extends BaseResultsType {
    @Field(() => UserProfile, {
        nullable: true,
        description: 'UserProfile',
    })
    userProfile?: UserProfile | null; // имя для поля - обратить внимание. После тестов удалить коммент
}
