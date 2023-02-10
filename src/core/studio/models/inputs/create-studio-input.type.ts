import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { ArgsType, Field, Float } from '@nestjs/graphql';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Length,
} from '@nestjs/class-validator';

@ArgsType()
export class CreateStudioInputType {
    @IsString()
    @Length(1, 64)
    @Field(() => String)
    name: string;

    @IsNumber()
    @Field(() => Float)
    rating: number;

    @IsUrl()
    @Field(() => GraphQLUpload)
    thumbnail: FileUpload;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String], { nullable: true })
    animes_to_add: string[];

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: true })
    is_animation_studio: boolean;

    @IsOptional()
    @Field(() => GraphQLUpload, {
        description: 'File to upload',
        nullable: true
    })
    file?: Promise<FileUpload>;
}
