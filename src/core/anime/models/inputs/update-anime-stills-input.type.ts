import { IsOptional, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID, InputType, Int } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";


@InputType()
class UpdStillsInput {
    @IsUUID()
    @Field(() => ID)
    id: string;

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
    @Field(() => [UpdStillsInput])
    stills: UpdStillsInput[];
}