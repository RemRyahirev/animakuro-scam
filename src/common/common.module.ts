import { Global, Module } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { SchemaService } from './services/schema.service';
import { PaginationService } from './services/pagination.service';
import { PasswordService } from './services/password.service';
import { PrismaService } from './services/prisma.service';
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
        PasswordService,
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
        PasswordService,
        PrismaService,
        SchemaService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
    ],
})
export class CommonModule {}
