import { Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { ComparePassword, EntityExists } from '../../../../common/decorators';

@ArgsType()
export class LoginInputType {
    @Field(() => String)
    @Length(1, 64)
    @EntityExists({ message: 'User not found' })
    username: string;

    @Field(() => String)
    @Length(1, 255)
    @ComparePassword({ message: 'Invalid password' })
    password: string;
}
