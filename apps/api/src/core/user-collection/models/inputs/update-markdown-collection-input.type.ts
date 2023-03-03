import { IsString } from "@nestjs/class-validator";
import { ArgsType, Field, ID } from "@nestjs/graphql";


@ArgsType()
export class UpdateMarkdownCollectionInputType {
    @Field(() => ID, {
        description: 'ID of markdown record'
    })
    id: string;

    @IsString()
    @Field(() => String, {
        description: 'Text with markup'
    })
    markdown: string;
}