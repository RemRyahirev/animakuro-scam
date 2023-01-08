import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { UserProfile } from '../user-profile.model';

@ObjectType()
export class GetUserProfileResultsType extends BaseResultsType {
    @Field(() => UserProfile, {
        nullable: true,
        description: 'UserProfile',
    })
    userProfile: UserProfile | null; // имя для поля - обратить внимание. После тестов удалить коммент
}
