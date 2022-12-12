import { createClient, RedisClientType } from 'redis';
import Config from '../common/config/config';

export default class Redis {
    private config = Config.getInstance().logic;
    private readonly _logic: RedisClientType;
    private static instance: Redis;

    constructor() {
        this._logic = createClient({
            url: this.config.redisUrl,
        });
    }

    public async connect() {
        return await this._logic
            .connect()
            .then(() => console.log('Redis connected'))
            .catch(console.log);
    }

    public static getInstance(): Redis {
        if (!Redis.instance) {
            Redis.instance = new Redis();
        }
        return Redis.instance;
    }

    get logic(): RedisClientType {
        return this._logic;
    }
}
