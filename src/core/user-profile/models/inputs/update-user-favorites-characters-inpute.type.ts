import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsUUID, IsArray } from '@nestjs/class-validator';

@ArgsType()
export class UpdateUserFavouriteCharactersInputType {
    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    favourite_characters_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    favourite_characters_remove?: string[];
}
