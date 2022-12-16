import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { User } from '../user.model';

@ObjectType()
export class CreateUserResultsType extends BaseResultsType {
    @Field(() => User, {
        nullable: true,
        description: 'User',
    })
    user: User | null;
}
