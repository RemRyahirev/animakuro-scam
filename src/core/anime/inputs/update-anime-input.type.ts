import { ArgsType, Field, ID } from 'type-graphql';
import { CreateAnimeInputType } from './create-anime-input.type';

@ArgsType()
export class UpdateAnimeInputType extends CreateAnimeInputType {
    @Field(() => ID)
    id: string;
}
