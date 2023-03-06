import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { User } from '../../../user/models/user.model';

@ObjectType()
export class LoginResultsType extends BaseResultsType {
    @Field(() => String, { nullable: true })
    access_token?: string;

    @Field(() => User, { nullable: true })
    user?: User;
}
