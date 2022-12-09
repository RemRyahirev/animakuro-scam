import { buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLError } from 'graphql';
import exceptionsHandler from '../common/errors/exception-handler';
import { ExtendedGraphQLError } from '../common/errors/types';
import path from 'path';
import { AuthCheckerMiddleware } from '../core/auth/middlewares/auth-checker.middleware';

export default async () => {
    const schema = await buildSchema({
        resolvers: [__dirname + '/../core/**/resolvers/*.resolver.{ts,js}'],
        emitSchemaFile: true,
        authChecker: new AuthCheckerMiddleware().check,
        authMode: 'null',
        validate: false,
    });

    return graphqlHTTP((request, response) => {
        return {
            schema,
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
};
