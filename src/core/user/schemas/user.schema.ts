import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Gender } from '../enums/gender.enum';
import { UserThirdParty } from './user-third-party.schema';

registerEnumType(Gender, {
    name: 'Gender',
});

@ObjectType()
export class User {
    @Field(() => ID)
    id = '0';

    @Field(() => String)
    username = 'CUSTOM_USERNAME';

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field({ nullable: true })
    banner?: string;

    @Field({ nullable: true })
    birthday?: Date;

    @Field(() => Gender, { defaultValue: Gender.UNSPECIFIED })
    gender = Gender.UNSPECIFIED;

    @Field({ nullable: true })
    customGender?: string;

    @Field(() => UserThirdParty, { nullable: true })
    thirdPartyAuth?: UserThirdParty;
}
