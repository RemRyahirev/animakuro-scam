import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { AuthSession } from '../auth-session.model';

@ObjectType()
export class CreateAuthSessionResultsType extends BaseResultsType {
    @Field(() => AuthSession, {
        nullable: true,
        description: 'Auth session',
    })
    auth_session: AuthSession | null;
}
