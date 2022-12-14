import { Field, ID, InputType } from 'type-graphql';
import { CreateAnimeInputType } from './create-anime-input.type';

@InputType()
export class UpdateAnimeInputType extends CreateAnimeInputType {
    @Field(() => ID)
    id: string;
}
