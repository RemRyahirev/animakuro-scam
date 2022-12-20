import { createServer } from './server';
import { Config } from './loaders';

async function bootstrap(): Promise<void> {
    try {
        const config = new Config().logic;
        const port = config.get('PORT', 8080);
        const app = await createServer();
        app.listen(port);
        console.log(`🚀 Server is running on: http://localhost:${port}/graphql`);
    } catch (error) {
        console.error(`❌ Error starting server, ${error}`);
        process.exit();
    }
}

bootstrap().catch((e) => {
    console.error(`❌ Error starting server, ${e}`);
    throw e;
});
