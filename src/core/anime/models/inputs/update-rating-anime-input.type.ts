import { IsNumber } from '@nestjs/class-validator';
import { ArgsType, Field, Float, ID, Int } from '@nestjs/graphql';
import { IsString, IsUUID, Max, Min } from 'class-validator';

@ArgsType()
export class UpdateRatingAnimeInputType {
    @IsUUID(4)
    @Field(() => ID)
    id: string;

    @Min(1)
    @Max(5)
    @IsNumber()
    @Field(() => Int)
    reyting: number;
}
