import { IsArray, IsNotEmpty, IsOptional, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID, InputType, Int } from "@nestjs/graphql";
import { AnimeStillsType } from "@prisma/client";
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
    priority?: number;

    @IsOptional()
    @Field(() => AnimeStillsType, {
        nullable: true,
        description: 'Data type of current still'
    })
    type?: AnimeStillsType

    @IsOptional()
    @Field(() => String, {
        nullable: true
    })
    url_id?: string;
}

@ArgsType()
export class UpdateAnimeStillsInputType {
    @IsArray()
    @Field(() => [UpdStillsInput])
    stills: UpdStillsInput[];
}