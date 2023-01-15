import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Gender } from '../../../common/models/enums';
import { Auth } from '../../auth/models/auth.model';

@ObjectType()
export class User {
    @Field(() => ID, {
        description: 'Unique ID of the user',
    })
    id: string;

    @Field(() => String, {
        description: 'Username',
    })
    username: string;

    @Field({ nullable: true, description: 'Email of the user' })
    email: string;

    @Field(() => Boolean, {
        nullable: true,
        description: 'Email verified status of the user',
    })
    is_email_confirmed: boolean;

    @Field({ nullable: true, description: 'Avatar (image) of the user' })
    avatar: string;

    @Field({ nullable: true })
    banner: string;

    @Field({ nullable: true, description: 'Date of birth of the user' })
    birthday: Date;

    @Field(() => Gender, {
        defaultValue: Gender.UNSPECIFIED,
        description: 'Gender of the user',
    })
    gender = Gender.UNSPECIFIED;

    @Field(() => String, { nullable: true })
    customGender: string;

    @Field(() => Auth)
    auth: Auth;
}
