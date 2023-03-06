import { IsInt, IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID, Int } from "@nestjs/graphql";

@ArgsType()
export class AddHistoryCharacterArgsType {
    @IsUUID()
    @Field(() => ID, {
        description: 'Story character id'
    })
    character_id: string;

    @IsInt()
    @Field(() => Int, {
        description: 'Time in seconds'
    })
    spent_time: number;
}
