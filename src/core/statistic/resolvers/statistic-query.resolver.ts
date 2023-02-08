import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import {
    StatisticQueryType,
    StatisticRootResolver
} from './statistic-root.resolver';
import { GetUserStatisticFolderResultsType } from '../models/results';
import { StatisticService } from '../service/statistic.service';
import { AccessToken } from 'common/decorators';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards';

@Resolver(StatisticQueryType)
export class StatisticQueryResolver extends StatisticRootResolver {
    constructor(private statisticService: StatisticService) {
        super();
    }

    @ResolveField(() => GetUserStatisticFolderResultsType)
    @UseGuards(JwtAuthGuard)
    async getUserFolder(
        @AccessToken() user_id: string,
        @Args('id', { nullable: true }) id?: string,
    ): Promise<GetUserStatisticFolderResultsType> {
        return await this.statisticService.getUserStatisticFolder(
            id ?? user_id,
        );
    }
}
