import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from '@nestjs-modules/ioredis';

import { PrismaService } from '@app/common/services/prisma.service';
import { StatisticService } from '@app/common/services/statistic.service';

import { CalculationService } from './calculation.service';

import { StatisticController } from './statistic.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
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
        PrismaService,
        CalculationService,
    ],
    controllers: [
        StatisticController,
    ],
})
export class StatisticModule {}
