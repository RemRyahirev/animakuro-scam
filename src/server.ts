import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import loaders from './loaders';
import Redis from './loaders/redis';

export async function createServer() {
    loaders.Redis.getInstance();
    await new Redis().connect();
    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.post('/graphql', graphqlUploadExpress(), await loaders.doGraphql());
    return app;
}
