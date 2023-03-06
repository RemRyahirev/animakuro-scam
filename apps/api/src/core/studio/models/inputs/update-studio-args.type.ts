import { GraphQLUpload, FileUpload } from 'graphql-upload';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateStudioArgsType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Length(1, 64)
    name?: string;

    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @Field(() => GraphQLUpload)
    thumbnail?: Promise<FileUpload>;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    animes_to_add?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    animes_to_remove?: string[];

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: true })
    is_animation_studio: boolean;
}
