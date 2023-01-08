import { ArgsType, Field } from '@nestjs/graphql';
import { ThirdPartyAuth } from "../../../../common/models/enums";

@ArgsType()
export class ThirdPartyAuthInputType {
    @Field(() => String, { description: 'Third party account id' })
    uid: string;

    @Field(() => ThirdPartyAuth)
    type: ThirdPartyAuth;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    avatar?: string;
}
