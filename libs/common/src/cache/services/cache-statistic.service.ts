import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

import { PrismaService } from '../../services/prisma.service';

//import { CacheDatabaseService } from '../../../common/cache/services';

@Injectable()
export class CacheStatisticService {
    constructor(
        @InjectRedis() protected readonly redis: Redis,
        protected readonly prismaService: PrismaService,
    ) { }

    async getCategoryStatistic(category: string) {
        const categoryResult = await this.redis.keys(`${category}:*`);
        const newCategoryResult = [];
        for await (const elem of categoryResult) {
            newCategoryResult.push({
                key: elem,
                value: await this.redis.get(elem),
            });
        }
        return newCategoryResult;
    }

    async setCategoryReyting({
        category,
        reyting,
        key,
    }: {
        category: string;
        reyting: number | string;
        key: string;
    }) {
        const countResult = await this.redis.incr(`${category}:${key}`);
        const raytingResult = await this.redis.incrby(
            `${category}:${key}:rayting`,
            reyting,
        );
        return { count: countResult, rayting: raytingResult };
    }
}
