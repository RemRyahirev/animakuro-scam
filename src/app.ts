import { Server } from 'http';
import { createServer } from './server';
import Config from './common/config/config';

async function main() {
    const config = Config.getInstance().logic;
    const PORT = config.get('PORT', 8080);
    const app = await createServer();
    const server = await new Promise<Server>((resolve) => {
        const server = app.listen(PORT, () => resolve(server));
        console.log(`🚀 Server started at port ${PORT}`);
    });
}

main().catch(console.error);
