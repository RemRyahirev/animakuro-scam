import { Global, Module } from '@nestjs/common';

import { CacheDatabaseService } from './services';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [
        CacheDatabaseService,
    ],
    exports: [
        CacheDatabaseService,
    ],
})
export class CacheModule {}
