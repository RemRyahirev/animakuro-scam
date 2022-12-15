import { Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Mailer } from '../../../common/utils/mailer';
import { UserService } from '../../user/services/user.service';
import { ThirdPartyRedirectUrlReturnType } from '../schemas/auth.schema';
import { FacebookStrategy } from '../strategies/facebook.strategy';
import { AuthService } from '../services/auth.service';
import { User } from '../../user/models/user.model';

@ObjectType()
export class AuthMutationType {
    @Field(() => Boolean, { description: 'Register user, needs confirmation' })
    register: boolean;

    @Field(() => Boolean, { description: 'Confirm registration' })
    confirmRegistration: boolean;

    @Field(() => Boolean, { description: 'User login' })
    login: boolean;

    @Field(() => Boolean, { description: 'User logout' })
    logout: boolean;

    @Field(() => User, { description: 'Login or register 3rd party' })
    loginOrRegisterThirdParty: User;
}

@ObjectType()
export class AuthQueryType {
    @Field(() => ThirdPartyRedirectUrlReturnType, {
        description: 'Get 3rd party urls',
    })
    getThirdPartyRedirectUrls: ThirdPartyRedirectUrlReturnType;
}

@Resolver()
export class AuthRootResolver {
    protected facebookStrategy: FacebookStrategy = new FacebookStrategy();
    protected userService: UserService = new UserService();
    protected authService: AuthService = new AuthService();
    protected mailer = new Mailer();

    @Mutation(() => AuthMutationType, { description: 'Auth mutations' })
    authMutations() {
        return {};
    }

    @Query(() => AuthQueryType, { description: 'Auth queries' })
    authQueries() {
        return {};
    }
}
