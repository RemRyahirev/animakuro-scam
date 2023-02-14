import { StatisticService } from './services/statistic.service';
import { StatisticQueryResolver } from './resolvers/statistic-query.resolver';
import { StatisticRootResolver } from './resolvers/statistic-root.resolver';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    ClientGrpcProxy,
    ClientProxyFactory,
    Transport,
} from '@nestjs/microservices';
import { join } from 'path';

@Module({
    imports: [],
    controllers: [],
    providers: [
        StatisticService,
        StatisticQueryResolver,
        StatisticRootResolver,
        {
            provide: 'UsersServiceClient',
            useFactory: (configService: ConfigService): ClientGrpcProxy => {
                return ClientProxyFactory.create({
                    transport: Transport.GRPC,
                    options: {
                        url: configService.get<string>('STATISTIC_gRPC_URL'),
                        package: 'statistic',
                        protoPath: join(
                            __dirname,
                            '../../common/grpc/statistic.proto',
                        ),
                        loader: {
                            keepCase: true,
                            enums: String,
                            oneofs: true,
                            arrays: true,
                        },
                    },
                });
            },
            inject: [ConfigService],
        },
    ],
})
export class StatisticModule { }
