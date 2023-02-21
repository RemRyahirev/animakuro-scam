import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from '@nestjs-modules/ioredis';

import { CacheModule } from '@app/common/cache/cache.module';

import { StatisticService } from './statistic.service';

import { StatisticController } from './statistic.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        CacheModule,
        RedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                config: {
                    url: configService.get('REDIS_URL'),
                },
            }),
        }),
    ],
    providers: [
        StatisticService,
    ],
    controllers: [
        StatisticController,
    ],
})
export class StatisticModule {}
