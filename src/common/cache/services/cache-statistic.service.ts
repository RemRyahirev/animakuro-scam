import { PrismaService } from '../../services/prisma.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

//import { CacheDatabaseService } from '../../../common/cache/services';

@Injectable()
export class CacheStatisticService {
    constructor(
        @InjectRedis() protected readonly redis: Redis,
        protected readonly prismaService: PrismaService,
    ) {}


    async getCategoryStatistic(){

    }

}
