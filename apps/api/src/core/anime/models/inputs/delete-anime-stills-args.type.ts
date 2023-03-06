import { IsArray } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class DeleteAnimeStillsArgsType {
    @IsArray()
    @Field(() => [ID], {
        description: 'Array of stills id',
    })
    id_list: string[];
}
