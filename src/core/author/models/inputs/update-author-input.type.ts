import { ArgsType, Field, ID } from 'type-graphql';
import {
    IsOptional,
    IsString, IsUUID,
    Length
} from "class-validator";

@ArgsType()
export class UpdateAuthorInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    @Field(() => String, { nullable: true })
    author_name?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    bucket_id?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    bio?: string;
}
