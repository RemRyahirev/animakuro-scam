import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { UserStatisticFavourite } from '../favourite-statistic.model';

@ObjectType()
export class GetUserStatisticFavouriteResultsType extends BaseResultsType {
    @Field(() => UserStatisticFavourite, {
        nullable: true,
        description: 'UserStatisticFavourite',
    })
    userStatisticFavourite: UserStatisticFavourite | null;
}
