import { IsEnum, IsOptional, IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

import { Media } from '@app/common/models/enums';

@ArgsType()
export class UpdateUserFavouritesArgsType {
    @IsOptional()
    @IsUUID()
    @Field(() => ID, { nullable: true })
    id?: string;

    @IsOptional()
    @IsUUID()
    @Field(() => ID, { nullable: true })
    media_add: string;

    @IsOptional()
    @IsUUID()
    @Field(() => ID, { nullable: true })
    media_remove: string;

    @IsEnum(Media)
    @Field(() => Media)
    media_type: Media;
}
