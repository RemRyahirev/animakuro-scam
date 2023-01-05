import { Field, ID, ObjectType } from 'type-graphql';
import { Gender } from '../../../common/models/enums';
import { UserThirdParty } from './user-third-party.model';
import { RegistrationStatus } from '../../../common/models/enums';

@ObjectType()
export class User {
    @Field(() => ID, {
        description: 'Unique ID of the user',
    })
    id = '0';

    @Field(() => String, {
        description: 'Username',
    })
    username = 'CUSTOM_USERNAME';

    @Field({ nullable: true, description: 'Email of the user' })
    email?: string;

    @Field(() => RegistrationStatus, {
        nullable: true,
        description: 'Registration status of the user',
    })
    registrationStatus?: string;

    @Field({ nullable: true, description: 'Avatar (image) of the user' })
    avatar?: string;

    @Field({ nullable: true })
    banner?: string;

    @Field({ nullable: true, description: 'Date of birth of the user' })
    birthday?: Date;

    @Field(() => Gender, {
        defaultValue: Gender.UNSPECIFIED,
        description: 'Gender of the user',
    })
    gender = Gender.UNSPECIFIED;

    @Field(() => String, { nullable: true })
    customGender?: string | null;

    @Field(() => UserThirdParty, { nullable: true })
    thirdPartyAuth?: UserThirdParty;
}
