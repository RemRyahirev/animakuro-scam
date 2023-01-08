import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services';
import {
    AccountLimitConstraint,
    ComparePasswordConstraint,
    EntityExistsConstraint,
    UniqueConstraint,
} from './decorators';

@Global()
@Module({
    providers: [
        PrismaService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
    ],
    exports: [
        PrismaService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
    ],
})
export class CommonModule {}
