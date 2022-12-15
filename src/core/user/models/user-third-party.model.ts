import { Field, ObjectType } from 'type-graphql';
import { ThirdPartyAuthType } from '../../../common/models/enums';

@ObjectType()
export class UserThirdParty {
    @Field(() => String)
    uid: string;

    @Field(() => ThirdPartyAuthType)
    type: ThirdPartyAuthType;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    avatar?: string;
}
