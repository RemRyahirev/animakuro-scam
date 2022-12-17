import { createClient, RedisClientType } from 'redis';
import Config from '../common/config/config';
import { Singleton } from '../common/decorators';

@Singleton
export class Redis {
    private config = Config.getInstance().logic;
    private readonly _logic: RedisClientType;

    constructor() {
        this._logic = createClient({
            url: this.config.redisUrl,
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
