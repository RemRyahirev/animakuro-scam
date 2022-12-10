import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import database from './database';
import loaders from './loaders';

const { redis: redisExm, connect: connectRedis } = loaders.doRedis();
export const prisma = database;
export const redis = redisExm;

export async function createServer() {
    await connectRedis();

    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.post('/graphql', graphqlUploadExpress(), await loaders.doGraphql());
    return app;
}
