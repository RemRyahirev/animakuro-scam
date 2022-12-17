import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import { GraphQLMiddleware, Redis } from './loaders';

export async function createServer() {
    await new Redis().connect();
    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.post('/graphql', graphqlUploadExpress(), await new GraphQLMiddleware().init());
    return app;
}
