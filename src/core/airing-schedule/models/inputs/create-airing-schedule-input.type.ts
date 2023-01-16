import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateAiringScheduleInputType {
    @Field(() => [ID], {
        description: 'ID of anime',
    })
    scheduled_animes_add: string[];

    @Field(() => [Int], {
        defaultValue: null,
    })
    episodes: number[];
}
