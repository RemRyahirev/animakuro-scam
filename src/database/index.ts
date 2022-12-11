import { PrismaClient } from '@prisma/client';

export default class Database {
    private readonly _db: PrismaClient;
    private static instance: Database;

    private constructor() {
        this._db = new PrismaClient();
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    get logic(): PrismaClient {
        return this._db;
    }
}
