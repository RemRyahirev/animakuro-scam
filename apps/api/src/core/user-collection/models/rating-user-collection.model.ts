import { IsNumber, IsUUID, Max, Min } from '@nestjs/class-validator';
import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RatingUserCollection {
    @IsUUID()
    @Field(() => ID)
    user_profile_id: string;

    @IsUUID()
    @Field(() => ID)
    collection_id: string;

    @Min(1)
    @Max(5)
    @IsNumber()
    @Field(() => Int, {
        description: 'rating-User-Collection',
    })
    rating: number;
}
