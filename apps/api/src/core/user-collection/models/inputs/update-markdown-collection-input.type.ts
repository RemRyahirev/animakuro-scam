import { IsOptional, IsString, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID } from "@nestjs/graphql";


@ArgsType()
export class UpdateMarkdownCollectionInputType {
    @IsOptional()
    @IsUUID()
    @Field(() => ID, {
        nullable: true,
        description: 'ID of markdown record'
    })
    id?: string;

    @IsString()
    @Field(() => String, {
        description: 'Text with markup'
    })
    markdown: string;
}