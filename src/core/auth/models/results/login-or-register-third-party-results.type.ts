import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { User } from '../../../user/models/user.model';

@ObjectType()
export class LoginOrRegisterThirdPartyResultsType extends BaseResultsType {
    @Field(() => User)
    user: User;
}
