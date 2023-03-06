import { IsOptional, IsUUID, IsArray } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserFavouriteCharactersArgsType {
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
