import { IsNumber, IsUUID, Max, Min } from '@nestjs/class-validator';
import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class Rating {
    // @IsUUID()
    // @Field(() => ID, { description: 'parent anime id' })
    // id: string;

    @IsUUID()
    @Field(() => ID)
    user_id: string;

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
