import { IsDate, IsInt, IsOptional, IsString, IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

import { OpeningEndingType } from '../enums/opening-ending.enum';

@ArgsType()
export class GetOpeningEndingListInputType {

    @IsUUID()
    @IsOptional()
    @Field(() => ID, {
        description: 'Belongs to anime',
        nullable: true
    })
    anime_id?: string;

    @IsOptional()
    @Field(() => OpeningEndingType, {
        description: 'Is opening or ending',
        nullable: true
    })
    type?: OpeningEndingType;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        description: 'Name of the opening/ending',
        nullable: true
    })
    name?: string;

    @IsOptional()
    @IsString()
    @Field(() => String, {
        description: 'Author\'s name',
        nullable: true
    })
    author_name?: string;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        description: 'Start with',
        nullable: true
    })
    episode_start?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        description: 'End by',
        nullable: true
    })
    episode_end?: number;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        description: 'Min created_at ISO undefined',
        nullable: true
    })
    min_created_at?: Date

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        description: 'Max created_at ISO undefined',
        nullable: true
    })
    max_created_at?: Date

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        description: 'Min updated_at ISO undefined',
        nullable: true
    })
    min_updated_at?: Date

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        description: 'Max updated_at ISO undefined',
        nullable: true
    })
    max_updated_at?: Date
}
