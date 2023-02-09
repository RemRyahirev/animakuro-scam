import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsUUID, IsArray } from '@nestjs/class-validator';

@ArgsType()
export class UpdateUserFavouriteGenresInputType {
    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    favourite_genres_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    favourite_genres_remove?: string[];
}
