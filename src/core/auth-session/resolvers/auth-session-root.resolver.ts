import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateAuthSessionResultsType } from '../models/results/create-auth-session-results.type';
import { GetAuthSessionResultsType } from '../models/results/get-auth-session-results.type';
import { DeleteAuthSessionResultsType } from '../models/results/delete-auth-session-results.type';
import { GetListAuthSessionResultsType } from '../models/results/get-list-auth-session-results.type';
import { UpdateAuthSessionResultsType } from '../models/results/update-auth-session-results.type';

@ObjectType()
export class AuthSessionMutationType {
    @Field(() => CreateAuthSessionResultsType, {
        description: 'Create auth session',
    })
    createAuthSession: CreateAuthSessionResultsType;

    @Field(() => UpdateAuthSessionResultsType, {
        description: 'Update auth session',
    })
    updateAuthSession: UpdateAuthSessionResultsType;

    @Field(() => DeleteAuthSessionResultsType, {
        description: 'Delete auth session',
    })
    deleteAuthSession: DeleteAuthSessionResultsType;
}

@ObjectType()
export class AuthSessionQueryType {
    @Field(() => GetAuthSessionResultsType, {
        description: 'Get auth session by ID',
    })
    getAuthSession: GetAuthSessionResultsType;

    @Field(() => GetListAuthSessionResultsType, {
        description: 'Get auth session list',
    })
    getAuthSessionList: GetListAuthSessionResultsType;
}

@Resolver()
export class AuthSessionRootResolver {
    @Mutation(() => AuthSessionMutationType, {
        description: 'Auth session mutations',
    })
    authSessionMutations() {
        return {};
    }

    @Query(() => AuthSessionQueryType, { description: 'Auth session queries' })
    authSessionQueries() {
        return {};
    }
}
