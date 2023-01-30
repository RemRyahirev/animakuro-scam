import { IsEnum } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { Media } from '../../../../common/models/enums';
import { Media as PrismaMedia } from '@prisma/client';
import { IsUUID } from 'class-validator';

@ArgsType()
export class CreateProfileFavouritesInputType {
    @IsUUID()
    @Field(() => ID)
    profile_id: string;

    @IsUUID(4, { each: true })
    @Field(() => [ID])
    media_add: string[];

    @IsEnum(Media)
    @Field(() => Media)
    media_type: PrismaMedia;
}
