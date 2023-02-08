import { OpeningEndingType } from "../enums/opening-ending.enum";
import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsISO8601, IsOptional, IsString, IsUUID } from "@nestjs/class-validator";


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
    @IsISO8601()
    @Field(() => Date, {
        description: 'ISO 8601',
        nullable: true
    })
    created_at?: Date

    @IsOptional()
    @IsISO8601()
    @Field(() => Date, {
        description: 'ISO 8601',
        nullable: true
    })
    updated_at?: Date
}