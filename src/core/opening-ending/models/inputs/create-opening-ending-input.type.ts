import { OpeningEndingType } from "../enums/opening-ending.enum";
// import { OpeningEndingType } from '@prisma/client';
import { ArgsType, Field, Int } from "@nestjs/graphql";


@ArgsType()
export class CreateOpeningEndingInputType {
    @Field(() => String, {
        description: 'Belongs to anime'
    })
    anime_id: string;

    @Field(() => OpeningEndingType, {
        description: 'Is opening or ending'
    })
    type: OpeningEndingType;

    @Field(() => String, {
        description: 'Url to ending'
    })
    url: string;

    @Field(() => String, {
        description: 'Name of the ending'
    })
    name: string;

    @Field(() => String, {
        description: 'Author\'s name'
    })
    author_name: string;

    @Field(() => Int, {
        description: 'Start with'
    })
    episode_start: number;

    @Field(() => Int, {
        description: 'End by'
    })
    episode_end: number
}