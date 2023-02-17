import { Global, Module } from '@nestjs/common';

import { SchemaService } from './services/schema.service';
import { PaginationService } from './services/pagination.service';
import { PasswordService } from './services/password.service';
import { PrismaService } from './services/prisma.service';
import { FileUploadService } from './services/file-upload.service';
import {
    AccountLimitConstraint,
    ComparePasswordConstraint,
    EntityExistsConstraint,
    UniqueConstraint,
} from './decorators';

@Global()
@Module({
    providers: [
        PaginationService,
        PasswordService,
        PrismaService,
        SchemaService,
        FileUploadService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
    ],
    exports: [
        PaginationService,
        PasswordService,
        PrismaService,
        SchemaService,
        FileUploadService,
        EntityExistsConstraint,
        ComparePasswordConstraint,
        AccountLimitConstraint,
        UniqueConstraint,
    ],
})
export class CommonModule {}
