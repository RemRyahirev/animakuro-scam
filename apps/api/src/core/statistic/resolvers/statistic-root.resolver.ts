import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

import {
    GetUserStatisticFolderResultsType,
    GetUserStatisticFavouriteResultsType,
} from '../models/results';

@ObjectType()
export class StatisticQueryType {
    @Field(() => GetUserStatisticFolderResultsType, {
        description: 'User Statistic by Folder',
    })
    getUserStatisticFolder: GetUserStatisticFolderResultsType;

    @Field(() => GetUserStatisticFavouriteResultsType, {
        description: 'User Statistic by Favourite',
    })
    getUserStatisticFavourite: GetUserStatisticFavouriteResultsType;
}

@Resolver()
export class StatisticRootResolver {
    @Query(() => StatisticQueryType, {
        description: 'Statistic',
    })
    statisticQueries() {
        return {};
    }
}
