import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { UserStatisticFavourite } from '../statistic.model';

@ObjectType()
export class GetUserStatisticFavouriteResultsType extends BaseResultsType {
    @Field(() => [UserStatisticFavourite], {
        nullable: true,
        description: 'UserStatisticFavourite',
    })
    userStatisticFolders: UserStatisticFavourite[] | null;
}
