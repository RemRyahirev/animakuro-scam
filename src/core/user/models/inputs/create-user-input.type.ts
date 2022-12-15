import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { Gender } from '../../../../common/models/enums';

@ArgsType()
export class CreateUserInputType {
    @Field({ nullable: true })
    @IsString()
    @Length(1, 64)
    username?: string;

    @IsOptional()
    @Field({ nullable: true })
    @Length(1, 320)
    @IsEmail()
    email?: string;

    @IsString()
    @Field({ nullable: true })
    password?: string;

    // @IsOptional()
    // @Field({ nullable: true })
    // @Length(1, 20)
    // secret2fa?: string

    @IsOptional()
    @Field({ nullable: true })
    birthday?: Date;

    @IsOptional()
    @Field({ nullable: true })
    gender?: Gender;

    @IsOptional()
    @Field({ nullable: true })
    @Length(1, 64)
    customGender?: string;
}
