import { UseGuards } from '@nestjs/common';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import { ProfileId } from '@app/common/decorators';
import { JwtAuthGuard } from '@app/common/guards';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';

import {
    GetUserStatisticFolderResultsType,
    GetUserStatisticFavouriteResultsType,
} from '../models/results';
import { StatisticService } from '../services/statistic.service';
import { GetStatisticFolderArgsType } from '../models/inputs';

import {
    StatisticQueryType,
    StatisticRootResolver,
} from './statistic-root.resolver';

@Resolver(StatisticQueryType)
export class StatisticQueryResolver extends StatisticRootResolver {
    constructor(private statisticService: StatisticService) {
        super();
    }

    @ResolveField(() => GetUserStatisticFolderResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getUserStatisticFolder(
        @ProfileId() profileId: string,
        @Args({ nullable: true }) args?: GetStatisticFolderArgsType,
    ): Promise<GetUserStatisticFolderResultsType> {
        return await this.statisticService.getUserStatisticFolder({
            ...args,
            id: args?.id ?? profileId,
        });
    }

    @ResolveField(() => GetUserStatisticFavouriteResultsType, {
        middleware: [AuthMiddleware],
    })
    @UseGuards(JwtAuthGuard)
    async getUserStatisticFavourite(
        @ProfileId() profileId: string,
        @Args('id', { nullable: true }) id?: string,
    ): Promise<GetUserStatisticFavouriteResultsType> {
        return await this.statisticService.getUserStatisticFavourite(
            id ?? profileId,
        );
    }
}
