import { StatisticService } from './service/statistic.service';
import { StatisticQueryResolver } from './resolvers/statistic-query.resolver';
import { StatisticRootResolver } from './resolvers/statistic-root.resolver';

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [
        StatisticService,
        StatisticQueryResolver,
        StatisticRootResolver,
    ],
})
export class StatisticModule { }
