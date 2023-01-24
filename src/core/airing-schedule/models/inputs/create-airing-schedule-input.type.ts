import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsDate, IsInt, IsUUID } from '@nestjs/class-validator';

@ArgsType()
export class CreateAiringScheduleInputType {
    @IsDate()
    @Field(() => Date, { description: 'The official airing date of the media' })
    airing_at: Date;

    @IsInt()
    @Field(() => Int, {
        description: 'The airing episode number',
    })
    episode: number;

    @IsUUID(4)
    @Field(() => ID, {
        description: 'Anime ID related to the airing schedule',
    })
    anime_id: string
}
