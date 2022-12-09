import { GraphQLUpload } from 'graphql-upload';
import {
    IsEmail,
    IsOptional,
    IsString,
    Length,
    ValidateIf,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Gender } from '../enums/gender.enum';
import { IUpload } from '../../../common/types/upload.interface';

@InputType()
export class UpdateUserInput {
    @IsOptional()
    @Field(() => String, { nullable: true })
    @Length(1, 64)
    username = undefined as any as string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    @Length(1, 320)
    @IsEmail()
    email = undefined as any as string;

    @IsString()
    @ValidateIf((o) => o.newPassword)
    @Field(() => String, { nullable: true })
    password = undefined as any as string;

    @IsString()
    @ValidateIf((o) => o.password)
    @Field(() => String, { nullable: true })
    newPassword = undefined as any as string;

    @Field(() => Date, { nullable: true })
    birthday = undefined as any as Date;

    @Field(() => Gender, { nullable: true })
    gender = undefined as any as Gender;

    @Field(() => String, { nullable: true })
    customGender = undefined as any as string;

    @Field(() => GraphQLUpload, { nullable: true })
    avatar = undefined as any as IUpload;

    @Field(() => GraphQLUpload, { nullable: true })
    banner = undefined as any as IUpload;
}
