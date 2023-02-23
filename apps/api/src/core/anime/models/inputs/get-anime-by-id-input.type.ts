import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsUUID } from '@nestjs/class-validator';

@ArgsType()
export class GetAnimeByIdInputType {
    @IsUUID(4)
    @Field({ description: 'ID of the anime' })
    id: string;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'Maximum amount of authors returned',
        defaultValue: 10,
    })
    max_authors_count?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'Maximum amount of characters returned',
        defaultValue: 10,
    })
    max_characters_count?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'Maximum amount of related animes returned',
        defaultValue: 10,
    })
    max_related_by_animes_count?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'Maximum amount of similar animes returned',
        defaultValue: 10,
    })
    max_similar_by_animes_count?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'Maximum amount of openings returned',
        defaultValue: 10
    })
    max_openings_count?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'Maximum amount of endings returned',
        defaultValue: 10
    })
    max_endings_count?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'Minimum opening start',
    })
    min_opening_start?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        description: 'Minimum ending start',
    })
    min_ending_start?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        nullable: true,
        defaultValue: 10,
        description: 'Count of given stills'
    })
    max_stills: number;
}
