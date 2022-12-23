import { buildSchema } from 'type-graphql';
import { graphqlHTTP, OptionsData } from 'express-graphql';
import { GraphQLError, GraphQLSchema, printSchema } from 'graphql';
import { AuthCheckerMiddleware } from '../common/middlewares';
import { Singleton } from '../common/decorators';
import { RequestHandler } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { exceptionsHandler } from '../common/errors/exception-handler';
import {
    PrismaExceptionInterceptor,
    ValidationExceptionInterceptor
} from '../common/interceptors';

@Singleton
export class GraphQLMiddleware {
    private schema: GraphQLSchema;

    public async init(): Promise<RequestHandler> {
        this.schema = await this.buildSchema();
        // const sdl = printSchema(this.schema);
        // fs.writeFile(
        //     path.join(__dirname + '/../public/schema.gql'),
        //     sdl,
        //     {},
        //     (err: NodeJS.ErrnoException | null) => {
        //         if (err) console.log(err);
        //     },
        // );
        return graphqlHTTP((request, response) => {
            return <OptionsData>{
                schema: this.schema,
                pretty: true,
                context: { request, response },
                graphiql: false,
                customFormatErrorFn: (error: GraphQLError) =>
                    exceptionsHandler(error, response),
            };
        });
    }

    private async buildSchema(): Promise<GraphQLSchema> {
        return await buildSchema({
            resolvers: [__dirname + '/../core/**/resolvers/*.resolver.{ts,js}'],
            emitSchemaFile: true,
            authChecker: new AuthCheckerMiddleware().check,
            authMode: 'null',
            validate: true,
            globalMiddlewares: [
                PrismaExceptionInterceptor,
                ValidationExceptionInterceptor,
            ],
        });
    }
}
