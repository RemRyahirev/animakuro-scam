import { OauthRedirectUrlResultsType } from '../models/results/oauth-redirect-url-results.type';
import { LoginResultsType } from '../models/results/login-results.type';
import { RegisterResultsType } from '../models/results/register-results.type';
import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { LogoutResultsType } from '../models/results/logout-results.type';

@ObjectType()
export class AuthMutationType {
    @Field(() => LogoutResultsType, {
        description: 'Register user by credentials',
    })
    register: LogoutResultsType;

    @Field(() => RegisterResultsType, {
        description: 'Register user by OAuth',
    })
    registerSocial: RegisterResultsType;

    @Field(() => LoginResultsType, {
        description: 'User login by credentials',
    })
    login: LoginResultsType;

    @Field(() => LogoutResultsType, {
        description: 'User logout',
    })
    logout: LogoutResultsType;

    @Field(() => RegisterResultsType, {
        description: 'Confirm Email',
    })
    emailConfirmation: RegisterResultsType;
}

@ObjectType()
export class AuthQueryType {
    @Field(() => OauthRedirectUrlResultsType, {
        description: 'Get OAuth redirect url',
    })
    oauthRedirectUrl: OauthRedirectUrlResultsType;
}

@Resolver()
export class AuthRootResolver {
    @Mutation(() => AuthMutationType, { description: 'Auth mutations' })
    authMutations() {
        return {};
    }

    @Query(() => AuthQueryType, { description: 'Auth queries' })
    authQueries() {
        return {};
    }
}
