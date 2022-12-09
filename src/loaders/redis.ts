import * as dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

export default createClient({
    url: process.env.REDIS_URL,
});
