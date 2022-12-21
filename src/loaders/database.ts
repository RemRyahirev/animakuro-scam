import { PrismaClient } from '@prisma/client';
import { Singleton } from '../common/decorators';

@Singleton
export class Database {
    private readonly _db: PrismaClient;

    constructor() {
        this._db = new PrismaClient({
            errorFormat: 'minimal',
        });
    }

    public get logic(): PrismaClient {
        return this._db;
    }
}
