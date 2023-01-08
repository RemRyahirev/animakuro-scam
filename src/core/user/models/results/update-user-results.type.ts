import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { User } from '../user.model';

@ObjectType()
export class UpdateUserResultsType extends BaseResultsType {
    @Field(() => User, {
        nullable: true,
        description: 'User',
    })
    user: User | null;
}
