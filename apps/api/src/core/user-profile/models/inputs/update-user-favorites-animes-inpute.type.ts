import { IsOptional, IsUUID, IsArray } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserFavouriteAnimeArgsType {
    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    favourite_animes_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    favourite_animes_remove?: string[];
}
