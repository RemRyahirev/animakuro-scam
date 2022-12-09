import type { GraphQLError } from 'graphql';
import type { ArgumentValidationError } from 'type-graphql';

import type { GqlHttpException } from './errors';

// exepted error types
export interface ExtendedGraphQLError extends GraphQLError {
    originalError: Error | GqlHttpException | ArgumentValidationError;
}
