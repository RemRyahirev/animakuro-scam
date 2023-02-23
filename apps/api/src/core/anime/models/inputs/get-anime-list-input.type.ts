import { ArgsType, Field, Int } from "@nestjs/graphql";


@ArgsType()
export class GetAnimeListInputType {
    @Field(() => Int, {
        defaultValue: 3
    })
    max_stills: number;
}