import { Global, Module } from '@nestjs/common';
import {
    PaginationService,
    PrismaService,
    SchemaService,
    SessionService,
} from './services';
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
        SchemaService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
    ],
    exports: [
        SessionService,
        PaginationService,
        PrismaService,
        SchemaService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
    ],
})
export class CommonModule {}
