import { Global, Module } from '@nestjs/common';

import { CacheStatisticService, CacheDatabaseService } from './services';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [CacheStatisticService, CacheDatabaseService],
    exports: [CacheStatisticService, CacheDatabaseService],
})
export class CacheModule {}
