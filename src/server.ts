import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import database from './database';
import loaders from './loaders';

export const prisma = database;
export const redis = loaders.redis;

export async function createServer() {
    await redis.connect();
    console.log('Redis connected');

    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.post('/graphql', graphqlUploadExpress(), await loaders.graphql());
    return app;
}
