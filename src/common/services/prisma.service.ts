import {
    INestApplication,
    Injectable,
    Logger,
    OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        Logger.log('🚀 Prisma connection established');
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
            Logger.log('❌ App destroyed. Prisma connection closed');
        });
    }
}
