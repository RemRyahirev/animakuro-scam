import { IsString } from "@nestjs/class-validator";
import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CreateMarkdownCollectionArgsType {
    @IsString()
    @Field(() => String, {
        description: 'Text with markup'
    })
    markdown: string;
}
