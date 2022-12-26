import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results';
import {UserProfile} from "../user-profile.model";

@ObjectType()
export class CreateUserProfileResultsType extends BaseResultsType {
    @Field(() => UserProfile, {
        nullable: true,
        description: 'UserProfile',
    })
    user_profile: UserProfile | null; // имя для поля - обратить внимание. После тестов удалить коммент
}
