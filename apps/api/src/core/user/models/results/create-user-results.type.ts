import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { User } from '../user.model';

@ObjectType()
export class CreateUserResultsType extends BaseResultsType {
    @Field(() => User, {
        nullable: true,
        description: 'User',
    })
    user?: User;
}
