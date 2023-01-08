import { ThirdPartyRedirectUrlResultsType } from '../models/results/third-party-redirect-url-results.type';
import { LoginResultsType } from '../models/results/login-results.type';
import { RegisterResultsType } from '../models/results/register-results.type';
import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
export class AuthMutationType {
    @Field(() => RegisterResultsType, {
        description: 'Register user, needs confirmation',
    })
    register: RegisterResultsType;

    // @Field(() => ConfirmRegistrationResultsType, {
    //     description: 'Confirm registration',
    // })
    // confirmRegistration: ConfirmRegistrationResultsType;
    //
    @Field(() => LoginResultsType, { description: 'User login' })
    login: LoginResultsType;

    // @Field(() => LogoutResultsType, { description: 'User logout' })
    // logout: LogoutResultsType;
    //
    // @Field(() => LoginOrRegisterThirdPartyResultsType, {
    //     description: 'Login or register 3rd party',
    // })
    // loginOrRegisterThirdParty: LoginOrRegisterThirdPartyResultsType;
}

@ObjectType()
export class AuthQueryType {
    @Field(() => ThirdPartyRedirectUrlResultsType, {
        description: 'Get 3rd party urls',
    })
    getThirdPartyRedirectUrls: ThirdPartyRedirectUrlResultsType;
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
