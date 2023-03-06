import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import {
    IsDate,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';

@ArgsType()
export class UpdateAiringScheduleArgsType {
    /**
     * The airing schedule's ID
     */
    @IsUUID()
    @Field(() => ID)
    id: string;

    /**
     * The official airing date of the media
     */
    @IsOptional()
    @IsDate()
    airing_at?: Date;

    /**
     * The name of the airing episode
     */
    @IsOptional()
    @IsString()
    @Length(1, 100)
    name?: string;

    /**
     * The airing episode number
     */
    @IsOptional()
    @IsInt()
    @Field(() => Int)
    episode?: number;
}
