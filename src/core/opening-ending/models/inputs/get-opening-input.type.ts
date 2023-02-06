import { IsUUID } from "@nestjs/class-validator";
import { ArgsType, Field, ID } from "@nestjs/graphql";


@ArgsType()
export class GetOpeningInputType {
    @Field(() => ID)
    @IsUUID()
    id: string;
}