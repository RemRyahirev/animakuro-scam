import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class CacheDatabaseService {
    constructor(
        @InjectRedis() protected readonly redis: Redis,
        protected readonly prismaService: PrismaService,
    ) {}

    getCache() {}

    getCaches() {}

    async setCache(key: string, value: string | number | Buffer) {
        return await this.redis.set(key, JSON.stringify(value));
    }

    async setCounter(category: string, key: string): Promise<number> {
        return await this.redis.incr(`${category}:${key}`);
    }

    async setCounterBy(
        category: string,
        key: string,
        increment: number | string,
    ): Promise<number> {
        return await this.redis.incrby(`${category}:${key}`, increment);
    }
}
