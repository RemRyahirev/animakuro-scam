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
import { ArgsType, Field, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateStudioArgsType {
    @IsString()
    @Length(1, 64)
    @Field(() => String)
    name: string;

    @IsNumber()
    @Field(() => Float)
    rating: number;

    @IsOptional()
    @Field(() => GraphQLUpload, { nullable: true })
    thumbnail?: Promise<FileUpload>;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String], { nullable: true })
    animes_to_add: string[];

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: true })
    is_animation_studio: boolean;
}
