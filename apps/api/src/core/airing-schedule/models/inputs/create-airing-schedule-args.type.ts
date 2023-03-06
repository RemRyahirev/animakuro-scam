import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import {
    IsDate,
    IsInt,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';

@ArgsType()
export class CreateAiringScheduleArgsType {
    /**
     * The official airing date of the media
     */
    @IsDate()
    airing_at: Date;

    /**
     * The name of the airing episode
     */
    @IsString()
    @Length(1, 100)
    name: string;

    /**
     * The airing episode number
     */
    @IsInt()
    @Field(() => Int)
    episode: number;

    /**
     * Anime ID related to the airing schedule
     */
    @IsUUID(4)
    @Field(() => ID)
    anime_id: string;
}
