import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { buildSchema } from 'type-graphql'
import { graphqlUploadExpress } from 'graphql-upload'
import { graphqlHTTP } from 'express-graphql'
import { parse } from 'graphql'
import { compileQuery } from 'graphql-jit'
import { createClient } from 'redis'
import { PrismaClient } from '@prisma/client'
import { Server } from 'http'

import * as dotenv from 'dotenv'
import { ApiError, errors } from './errors/errors'
import { ValidationError } from 'class-validator'

dotenv.config()

const PORT = +process.env.PORT || 8080

export const redis = createClient({
    url: process.env.REDIS_URL,
})

export const prisma = new PrismaClient()

async function main() {

    await redis.connect()
    console.log('Redis connected')

    const app = await createServer()
    const server = await new Promise<Server>(resolve => {
        const server = app.listen(PORT, () => resolve(server))
    })

    console.log(`🚀 Server started at port ${PORT}`)

    // process.on('SIGTERM', shutDown);
    // process.on('SIGINT', shutDown);
    //
    // function shutDown() {
    //     console.log('Received kill signal, shutting down gracefully');
    //     server.close(() => {
    //         console.log('Closed out remaining connections');
    //         process.exit(0);
    //     });
    //
    //     setTimeout(() => {
    //         console.error('Could not close connections in time, forcefully shutting down');
    //         process.exit(1);
    //     }, 10000);
    // }
}

main().catch(console.error)

const cache = {}

async function createServer() {
    const app = express()
    const schema = await buildSchema({
        resolvers: [
            __dirname + '/**/*.resolver.ts',
            __dirname + '/**/*.resolver.js'
        ]
    })

    app.use(cors())
    app.post('/graphql',
        graphqlUploadExpress(),
        graphqlHTTP((request, response) => {
            return {
                schema,
                context: { request, response },
                graphiql: false,
                customFormatErrorFn(error) {
                    if (error.originalError instanceof ApiError) return {
                        path: error.path,
                        message: error.originalError.identifier,
                        extensions: error.originalError.export()
                    }

                    if (error.originalError && error.originalError["validationErrors"]) {
                        const errorList = error.originalError["validationErrors"]
                        // noinspection TypeScriptValidateJSTypes
                        const validation = errors.VALIDATION(errorList.filter(it => it instanceof ValidationError).map(it => ({
                            property: it.property as string,
                            reasons: Object.values(it.constraints) as string[]
                        })))
                        return {
                            path: error.path,
                            message: validation.identifier,
                            extensions: validation.export()
                        }
                    }
                    const internal = errors.INTERNAL()
                    console.error(error.path, error.originalError)
                    return {
                        path: error.path,
                        message: internal.identifier,
                        extensions: internal.export()
                    }
                }
            }
        })
        // (_, __, {query}) => {
        //     if (!(query in cache)) {
        //         const document = parse(query)
        //         redisClient.hSet('graphqlcache', query, Buffer.from(compileQuery(schema, document).toString()))
        //         // cache[query] = ;
        //     }
        //
        //     return {
        //         schema,
        //         graphiql: true,
        //         customExecuteFn: ({rootValue, variableValues, contextValue}) =>
        //             cache[query].query(rootValue, contextValue, variableValues),
        //     }
        // }
    )

    return app
}

// async function createServer() {
//     const schema = await buildSchema({
//         resolvers: [HelloResolver, AuthResolver],
//     })
//
//     const expressServer = Express();
//     const httpServer = http.createServer(expressServer)
//
//     const apolloServer = new ApolloServer({
//         schema,
//         csrfPrevention: true,
//         plugins: [
//             ApolloServerPluginLandingPageLocalDefault({ embed: true }),
//             ApolloServerPluginDrainHttpServer({httpServer})
//         ]
//     })
//
//     await apolloServer.start()
//     apolloServer.applyMiddleware({ app: expressServer })
//
//     return {apolloServer, expressServer, httpServer}
// }
