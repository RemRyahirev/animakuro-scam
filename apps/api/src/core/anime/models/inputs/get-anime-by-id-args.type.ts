import { IsInt, IsOptional, IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class GetAnimeByIdArgsType {
    /**
     * ID of the anime
     */
    @IsUUID(4)
    @Field(() => ID)
    id: string;

    /**
     * Maximum amount of authors returned
     */
    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        defaultValue: 10,
    })
    max_authors_count?: number;

    /**
     * Maximum amount of characters returned
     */
    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        defaultValue: 10,
    })
    max_characters_count?: number;

    /**
     * Maximum amount of related animes returned
     */
    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        defaultValue: 10,
    })
    max_related_by_animes_count?: number;

    /**
     * Maximum amount of similar animes returned
     */
    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        defaultValue: 10,
    })
    max_similar_by_animes_count?: number;

    /**
     * Maximum amount of openings returned
     */
    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        defaultValue: 10
    })
    max_openings_count?: number;

    /**
     * Maximum amount of endings returned
     */
    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        defaultValue: 10
    })
    max_endings_count?: number;

    /**
     * Minimum opening start
     */
    @IsOptional()
    @IsInt()
    @Field(() => Int)
    min_opening_start?: number;

    /**
     * Minimum ending start
     */
    @IsOptional()
    @IsInt()
    @Field(() => Int)
    min_ending_start?: number;

    /**
     * Count of given stills
     */
    @IsOptional()
    @IsInt()
    @Field(() => Int, {
        defaultValue: 10,
    })
    max_stills?: number;
}
