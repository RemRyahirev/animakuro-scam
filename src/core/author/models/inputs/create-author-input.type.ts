import { ArgsType, Field } from 'type-graphql';
import {
    IsString,
    Length,
} from 'class-validator';

@ArgsType()
export class CreateAuthorInputType {
    @IsString()
    @Length(1, 50)
    @Field(() => String)
    author_name: string;

    @IsString()
    @Field(() => String)
    bucket_id: string;

    @IsString()
    @Field(() => String)
    bio: string;

}
