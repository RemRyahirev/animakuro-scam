import { buildSchema } from 'type-graphql';
import { graphqlHTTP, OptionsData } from 'express-graphql';
import { GraphQLError, GraphQLSchema } from 'graphql';
import exceptionsHandler from '../common/errors/exception-handler';
import { ExtendedGraphQLError } from '../common/errors/types';
import { AuthCheckerMiddleware } from '../common/middlewares';
import { Singleton } from '../common/decorators';
import { RequestHandler } from 'express';

@Singleton
export class GraphQLMiddleware {
    private schema: GraphQLSchema;

    public async init(): Promise<RequestHandler> {
        this.schema = await this.buildSchema();
        return graphqlHTTP((request, response) => {
            return <OptionsData>{
                schema: this.schema,
                context: { request, response },
                graphiql: false,
                customFormatErrorFn: (error: GraphQLError) => {
                    return exceptionsHandler(
                        error as ExtendedGraphQLError,
                        response,
                    );
                },
            };
        });
    }

    private async buildSchema(): Promise<GraphQLSchema> {
        return await buildSchema({
            resolvers: [__dirname + '/../core/**/resolvers/*.resolver.{ts,js}'],
            emitSchemaFile: true,
            authChecker: new AuthCheckerMiddleware().check,
            authMode: 'null',
            validate: false,
        });
    }
}
