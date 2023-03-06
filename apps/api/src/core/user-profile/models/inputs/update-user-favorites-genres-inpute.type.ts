import { IsOptional, IsUUID, IsArray } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserFavouriteGenresArgsType {
    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    favourite_genres_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    favourite_genres_remove?: string[];
}
