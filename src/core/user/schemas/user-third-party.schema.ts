import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { ThirdPartyAuthType } from '../enums/user-third-party-type.enum';

registerEnumType(ThirdPartyAuthType, {
    name: 'ThirdPartyAuthType',
});

@ObjectType()
export class UserThirdParty {
    @Field(() => String)
    uid = undefined as any as string;

    @Field(() => ThirdPartyAuthType)
    type = undefined as any as ThirdPartyAuthType;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    avatar?: string;
}
