import { OpeningEndingType } from "./enums/opening-ending.enum";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Anime } from "../../anime/models/anime.model";
// import { OpeningEndingType } from '@prisma/client';


@ObjectType()
export class OpeningEnding {
    @Field(() => ID, {
        description: 'Unique ID of the ending',
    })
    id: string;

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
    episode_end: number;

    @Field(() => Anime, {
        nullable: true,
        description: 'Belongs to anime'
    })
    anime: Anime;
}