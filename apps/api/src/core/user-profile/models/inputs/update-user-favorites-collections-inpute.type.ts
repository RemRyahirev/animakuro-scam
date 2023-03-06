import { IsOptional, IsUUID, IsArray } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserFavouriteCollectionsArgsType {
    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    favourite_collections_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [ID], { nullable: true })
    favourite_collections_remove?: string[];
}
