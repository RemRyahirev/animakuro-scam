import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { UserCollection } from '../../../user-collection/models/user-collection.model';

@ObjectType()
export class UpdateUserFavouriteCollectionsResultType extends BaseResultsType {
    @Field(() => [UserCollection], {
        nullable: true,
        description: 'User Profile list add favourite Collections',
    })
    userFavouriteCollections: UserCollection[] | null;
}
