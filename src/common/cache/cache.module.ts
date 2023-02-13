import { CacheStatisticService, CacheDatabaseService } from './services';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [CacheStatisticService, CacheDatabaseService],
    exports: [CacheStatisticService, CacheDatabaseService],
})
export class CacheModule {}
