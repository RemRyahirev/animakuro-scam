import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { UserCollection } from '../user-collection.model';

@ObjectType()
export class CreateUserCollectionResultsType extends BaseResultsType {
    @Field(() => UserCollection, {
        nullable: true,
        description: 'User Collection',
    })
    userCollection: UserCollection | null;
}
