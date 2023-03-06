import { IsOptional, IsUUID, IsArray } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserFavouriteStudiosArgsType {
    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    favourite_studios_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID])
    favourite_studios_remove?: string[];
}
