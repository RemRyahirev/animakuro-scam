import { createClient, RedisClientType } from 'redis';
import { Config } from './config';
import { Singleton } from '../common/decorators';

@Singleton
export class Redis {
    private readonly _config = new Config().logic;
    private readonly _logic: RedisClientType;

    constructor() {
        this._logic = createClient({
            url: this._config.redisUrl,
        });
        this._logic.on('disconnect', async () => {
            await this._logic.connect();
        });
    }

    public async connect(): Promise<void> {
        return await this._logic
            .connect()
            .then(() => console.log('Redis connected'))
            .catch(console.log);
    }

    public get logic(): RedisClientType {
        return this._logic;
    }
}
