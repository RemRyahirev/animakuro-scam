import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { GetUserStatisticFolderResultsType } from '../models/results';

@ObjectType()
export class StatisticQueryType {
    @Field(() => GetUserStatisticFolderResultsType, {
        description: 'User Statistic by Folder',
    })
    getUserStatisticFolder: GetUserStatisticFolderResultsType;
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
