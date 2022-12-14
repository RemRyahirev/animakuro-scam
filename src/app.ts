import { createServer } from './server';
import Config from './common/config/config';

async function bootstrap(): Promise<void> {
    try {
        const config = Config.getInstance().logic;
        const PORT = config.get('PORT', 8080);
        const app = await createServer();
        app.listen(PORT);
        console.log(`🚀 Server started at port ${PORT}`);
    } catch (error) {
        console.error(`❌ Error starting server, ${error}`);
        process.exit();
    }
}

bootstrap().catch((e) => {
    console.error(`❌ Error starting server, ${e}`);
    throw e;
});
