import { IsOptional, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { UploadStills } from "../stills.model";


@ArgsType()
export class AddAnimeStillsInputType {
    @IsUUID()
    @Field(() => ID, {
        description: 'Id of parrent anime'
    })
    anime_id: string;

    @IsOptional()
    @Field(() => [GraphQLUpload], {
        nullable: true,
        description: 'Need if you gonna upload file to cdn'
    })
    stills_files?: Promise<FileUpload>[];

    @IsOptional()
    @Field(() => [UploadStills])
    stills: UploadStills[];
}