import { ArgsType, Field, Float } from 'type-graphql';
import { ArrayNotEmpty, IsNumber, IsString, IsUrl, IsUUID, Length } from "class-validator";

@ArgsType()
export class CreateStudioInputType {
    @IsString()
    @Length(1, 64)
    @Field(() => String)
    studio_name: string;

    @IsNumber()
    @Field(() => Float)
    rating: number;

    @IsUrl()
    @Field(() => String)
    thumbnail: string;

    @IsUUID(4, { each: true })
    @ArrayNotEmpty({
        message: 'array of anime id\'s not provided'
    })
    @Field(() => [String])
    anime: string[];
}
