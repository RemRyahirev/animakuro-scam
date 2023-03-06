import { IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID, Int } from "@nestjs/graphql";
import { IsInt } from "class-validator";

@ArgsType()
export class AddHistoryAuthorArgs {
    @IsUUID()
    @Field(() => ID, {
        description: 'Story author id'
    })
    author_id: string;

    @IsInt()
    @Field(() => Int, {
        description: 'Time in seconds'
    })
    spent_time: number;
}
