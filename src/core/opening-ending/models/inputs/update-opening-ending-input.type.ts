import { OpeningEndingType } from "../enums/opening-ending.enum";
import { ArgsType, Field, ID, Int } from "@nestjs/graphql";
import { IsUUID } from "@nestjs/class-validator";


@ArgsType()
export class UpdateOpeningInputType {

    @IsUUID()
    @Field(() => ID, {
        description: 'Record id'
    })
    id: string;
    
    @IsUUID()
    @Field(() => ID, {
        nullable: true,
        description: 'Belongs to anime'
    })
    anime_id?: string;

    @Field(() => OpeningEndingType, {
        nullable: true,
        description: 'Is opening or ending'
    })
    type?: OpeningEndingType;

    @Field(() => String, {
        nullable: true,
        description: 'Url to ending'
    })
    url?: string;

    @Field(() => String, {
        nullable: true,
        description: 'Name of the ending'
    })
    name?: string;

    @Field(() => String, {
        nullable: true,
        description: 'Author\'s name'
    })
    author_name?: string;

    @Field(() => Int, {
        nullable: true,
        description: 'Start with'
    })
    episode_start?: number;

    @Field(() => Int, {
        nullable: true,
        description: 'End by'
    })
    episode_end?: number
}