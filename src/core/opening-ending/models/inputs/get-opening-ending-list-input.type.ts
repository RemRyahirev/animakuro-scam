import { OpeningEndingType } from "../enums/opening-ending.enum";
import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsOptional, IsUUID } from "@nestjs/class-validator";


@ArgsType()
export class GetOpeningEndingListInputType {

    @IsUUID()
    @IsOptional()
    @Field(() => ID, {
        description: 'Belongs to anime',
        nullable: true
    })
    anime_id?: string;

    @Field(() => OpeningEndingType, {
        description: 'Is opening or ending',
        nullable: true
    })
    type?: OpeningEndingType;

    @Field(() => String, {
        description: 'Name of the opening/ending',
        nullable: true
    })
    name?: string;

    @Field(() => String, {
        description: 'Author\'s name',
        nullable: true
    })
    author_name?: string;
    
}