import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { AuthSession } from '../auth-session.model';

@ObjectType()
export class UpdateAuthSessionResultsType extends BaseResultsType {
    @Field(() => AuthSession, {
        nullable: true,
        description: 'Auth session',
    })
    auth_session: AuthSession | null;
}
