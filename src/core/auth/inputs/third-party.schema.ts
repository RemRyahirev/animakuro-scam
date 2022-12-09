import { ThirdPartyAuthType } from 'core/user/enums/user-third-party-type.enum';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ThirdPartyAuthInput {
    @Field(() => String)
    /**
     * Third party account id
     */
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
