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
}
