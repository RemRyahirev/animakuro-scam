import { IsOptional, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID } from "@nestjs/graphql";

@ArgsType()
export class GetMarkdownCollectionArgsType {
    @IsUUID()
    @IsOptional()
    @Field(() => ID, {
        nullable: true,
        description: 'Markdown collection ID'
    })
    id: string;
}
