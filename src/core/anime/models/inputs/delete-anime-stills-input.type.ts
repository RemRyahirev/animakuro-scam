import { ArgsType, Field, ID } from "@nestjs/graphql";


@ArgsType()
export class DeleteAnimeStillsInputType {
    @Field(() => [ID], {
        description: 'Array of stills id'
    })
    id_list: string[];
}