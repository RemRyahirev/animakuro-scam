import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import {
    IsDate,
    IsInt,
    IsString,
    IsUUID,
    Length,
} from '@nestjs/class-validator';

@ArgsType()
export class CreateAiringScheduleInputType {
    @IsDate()
    @Field(() => Date, { description: 'The official airing date of the media' })
    airing_at: Date;

    @IsString()
    @Length(1, 100)
    @Field(() => String, {
        description: 'The name of the airing episode',
    })
    name: string;

    @IsInt()
    @Field(() => Int, {
        description: 'The airing episode number',
    })
    episode: number;

    @IsUUID(4)
    @Field(() => ID, {
        description: 'Anime ID related to the airing schedule',
    })
    anime_id: string;
}
