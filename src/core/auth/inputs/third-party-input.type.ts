import { ThirdPartyAuthType } from 'core/user/enums/user-third-party-type.enum';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class ThirdPartyAuthInputType {
    /**
     * Third party account id
     */
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
