import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload';
import { GraphQLMiddleware, Redis } from './loaders';

export async function createServer() {
    await new Redis().connect();
    const app = express();
    app.use(cors({
        credentials: true
    }));
    app.use(session({
        secret: 'test-secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        }
    }))
    app.use(express.static('src/public'));
    app.use(express.static('build/public'));
    app.post(
        '/graphql',
        graphqlUploadExpress(),
        await new GraphQLMiddleware().init(),
    );
    return app;
}
