import { IsInt, IsOptional, IsString, IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

import { OpeningEndingType } from '../enums/opening-ending.enum';

@ArgsType()
export class UpdateOpeningEndingArgsType {
    @IsUUID()
    @Field(() => ID, {
        description: 'Record id'
    })
    id: string;

    @IsUUID()
    @IsOptional()
    @Field(() => ID, {
        nullable: true,
        description: 'Belongs to anime'
    })
    anime_id?: string;

    @IsOptional()
    @Field(() => OpeningEndingType, {
        nullable: true,
        description: 'Is opening or ending'
    })
    type?: OpeningEndingType;

    @IsOptional()
    @Field(() => String, {
        nullable: true,
        description: 'Url to ending'
    })
    url?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: 'Name of the ending'
    })
    name?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        nullable: true,
        description: 'Author\'s name'
    })
    author_name?: string;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'Start with'
    })
    episode_start?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'End by'
    })
    episode_end?: number
}
