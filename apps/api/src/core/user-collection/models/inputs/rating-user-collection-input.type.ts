import { IsNumber, IsUUID, Max, Min } from '@nestjs/class-validator';
import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RatingUserCollectionInputType {
    @IsUUID()
    @Field(() => ID)
    user_profile_id: string;

    @IsUUID()
    @Field(() => ID)
    collection_id: string;

    /**
     * rating-User-Collection
     */
    @Min(1)
    @Max(5)
    @IsNumber()
    @Field(() => Int)
    rating: number;
}
