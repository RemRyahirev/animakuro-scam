import { IsEnum, IsOptional, IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { Media } from '../../../../common/models/enums';
import { Media as PrismaMedia } from '@prisma/client';

@ArgsType()
export class UpdateProfileFavouritesInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsUUID(4, { each: true })
    @Field(() => [ID], { nullable: true })
    media_add: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @Field(() => [ID], { nullable: true })
    media_remove: string[];

    @IsEnum(Media)
    @Field(() => Media)
    media_type: PrismaMedia;
}
