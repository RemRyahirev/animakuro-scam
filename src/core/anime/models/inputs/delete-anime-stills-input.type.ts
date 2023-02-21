import { IsArray, IsNotEmpty, Length } from "@nestjs/class-validator";
import { ArgsType, Field, ID } from "@nestjs/graphql";


@ArgsType()
export class DeleteAnimeStillsInputType {
    @IsArray()
    @Field(() => [ID], {
        description: 'Array of stills id'
    })
    id_list: string[];
}