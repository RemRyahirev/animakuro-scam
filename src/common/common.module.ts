import { Global, Module } from '@nestjs/common';
import { PaginationService, PrismaService, SessionService } from './services';
import {
    AccountLimitConstraint,
    ComparePasswordConstraint,
    EntityExistsConstraint,
    UniqueConstraint,
} from './decorators';

@Global()
@Module({
    providers: [
        SessionService,
        PaginationService,
        PrismaService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
    ],
    exports: [
        SessionService,
        PaginationService,
        PrismaService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
    ],
})
export class CommonModule {}
