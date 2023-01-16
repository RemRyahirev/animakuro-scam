import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateAiringScheduleInputType {
    @Field(() => ID, {
        nullable: true,
        description: 'ID of anime',
    })
    anime_id: string;

    @Field(() => Int, {
        nullable: true,
        defaultValue: null,
    })
    episode: number;
}
