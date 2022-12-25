import { ArgsType, Field, Float, ID } from 'type-graphql';
import {
    ArrayNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from 'class-validator';

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
    @ArrayNotEmpty({
        message:
            "array of anime id's not provided. If you want drop relation -> change studio in anime at first",
    })
    @Field(() => [String], { nullable: true })
    anime?: string[];
}
