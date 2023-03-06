import { IsEnum, IsInt, IsString, IsUrl, IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';

import { OpeningEndingType } from '../enums/opening-ending.enum';

@ArgsType()
export class CreateOpeningEndingArgsType {
    @IsUUID()
    @Field(() => String, {
        description: 'Belongs to anime'
    })
    anime_id: string;

    @IsEnum(OpeningEndingType)
    @Field(() => OpeningEndingType, {
        description: 'Is opening or ending'
    })
    type: OpeningEndingType;

    @IsUrl()
    @Field(() => String, {
        description: 'Url to ending'
    })
    url: string;

    @IsString()
    @Field(() => String, {
        description: 'Name of the ending'
    })
    name: string;

    @IsString()
    @Field(() => String, {
        description: 'Author\'s name'
    })
    author_name: string;

    @IsInt()
    @Field(() => Int, {
        description: 'Start with'
    })
    episode_start: number;

    @IsInt()
    @Field(() => Int, {
        description: 'End by'
    })
    episode_end: number
}
