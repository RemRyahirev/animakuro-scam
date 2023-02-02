import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { UserCollection } from '../user-collection.model';

@ObjectType()
export class DeleteUserCollectionResultsType extends BaseResultsType {
    @Field(() => UserCollection, {
        nullable: true,
        description: 'User Collection',
    })
    userCollection: UserCollection | null;
}
