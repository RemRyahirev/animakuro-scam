import { IsOptional, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID, InputType, Int } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";


@InputType()
class UpdStillsInput {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @Field(() => Int, {
        nullable: true
    })
    still_index?: number;

    @IsOptional()
    @Field(() => Number, {
        nullable: true
    })
    priority?: number;

    @IsOptional()
    @Field(() => String, {
        nullable: true
    })
    url_id?: string;
}

@ArgsType()
export class UpdateAnimeStillsInputType {
    @IsUUID()
    @Field(() => ID)
    anime_id: string;

    @Field(() => [GraphQLUpload], {
        nullable: true,
        description: 'Need if you gonna upload file to cdn'
    })
    stills_files?: Promise<FileUpload>[];

    @Field(() => [UpdStillsInput])
    stills: UpdStillsInput[];
}