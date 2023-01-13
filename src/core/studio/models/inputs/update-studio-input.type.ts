import { ArgsType, Field, Float, ID } from '@nestjs/graphql';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';

@ArgsType()
export class UpdateStudioInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Length(1, 64)
    @Field(() => String, { nullable: true })
    studio_name?: string;

    @IsOptional()
    @IsNumber()
    @Field(() => Float, { nullable: true })
    rating?: number;

    @IsOptional()
    @Field(() => String, { nullable: true })
    thumbnail?: string;

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String], { nullable: true })
    animeToAdd?: string[];

    @IsOptional()
    @IsUUID(4, { each: true })
    @IsArray()
    @Field(() => [String], { nullable: true })
    animeToRemove?: string[];

    @IsBoolean()
    @Field(() => Boolean, { defaultValue: true })
    is_animation_studio: boolean;
}
