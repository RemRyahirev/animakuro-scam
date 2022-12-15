import { Field, ObjectType } from "type-graphql";
import { LoginType } from "../../../common/models/enums";

// @InputType()
// export class TwoFAInput {
//     @Field()
//     @Length(6, 6)
//     code: string

//     @Field()
//     @Length(1, 255)
//     token: string
// }

@ObjectType()
export class LoginReturnType {
    @Field(() => LoginType)
    type = undefined as any as LoginType;

    @Field(() => String)
    token = undefined as any as string;
}

@ObjectType()
export class ThirdPartyRedirectUrlReturnType {
    @Field(() => String)
    facebook = undefined as any as string;
}
