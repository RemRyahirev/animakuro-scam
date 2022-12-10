import * as dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

export default () => {
    const redis = createClient({
        url: process.env.REDIS_URL,
    });
    const connect = () =>
        redis
            .connect()
            .then(() => console.log('Redis connected'))
            .catch(console.log);
    return { connect, redis };
};
