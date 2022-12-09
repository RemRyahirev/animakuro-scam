import { Server } from 'http';
import * as dotenv from 'dotenv';
import { createServer } from './server';

dotenv.config();
const PORT = process.env.PORT ? +process.env.PORT : 8080;

async function main() {
    // await redis.connect()
    // console.log('Redis connected');

    const app = await createServer();
    const server = await new Promise<Server>((resolve) => {
        const server = app.listen(PORT, () => resolve(server));
    });

    console.log(`🚀 Server started at port ${PORT}`);
}

main().catch(console.error);
