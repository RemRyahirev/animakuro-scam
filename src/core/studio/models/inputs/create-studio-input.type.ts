import { ArgsType, Field, Float } from '@nestjs/graphql';
import {
    IsArray,
    IsBoolean,
    IsNumber,
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
    @Field(() => String)
    thumbnail: string;

    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String])
    anime_to_add: string[];

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: true })
    is_animation_studio: boolean;
}
