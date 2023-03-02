import { IsNumber, IsUUID, Max, Min } from '@nestjs/class-validator';
import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class Rating {
    // @IsUUID()
    // @Field(() => ID, { description: 'parent anime id' })
    // id: string;

    @IsUUID()
    @Field(() => ID)
    user_profile_id: string;

    @IsUUID()
    @Field(() => ID)
    anime_id: string;

    @Min(1)
    @Max(5)
    @IsNumber()
    @Field(() => Int, {
        description: 'relationStatus',
    })
    rating: number;
}

@InputType()
export class EvaluationType {
    @IsNumber()
    @Field(() => Int)
    5: number;

    @IsNumber()
    @Field(() => Int)
    4: number;

    @IsNumber()
    @Field(() => Int)
    3: number;

    @IsNumber()
    @Field(() => Int)
    2: number;

    @IsNumber()
    @Field(() => Int)
    1: number;
}
