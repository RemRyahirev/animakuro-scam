import { IsInt, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID, Int } from "@nestjs/graphql";

@ArgsType()
export class AddHistoryAnimeArgsType {
    @IsUUID()
    @Field(() => ID, {
        description: 'Story anime id'
    })
    anime_id: string;

    @IsInt()
    @Field(() => Int, {
        description: 'Time in seconds'
    })
    spent_time: number;
}
