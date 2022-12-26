import { Field, ID, ObjectType } from 'type-graphql';
import { CharacterRole, CharacterType } from '../../../common/models/enums';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class Character {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    bucket_id: string;

    @Field(() => String)
    character_name: string;

    @Field(() => CharacterType, { defaultValue: CharacterType.PROTAGONIST })
    importance: string;

    @Field(() => CharacterRole, { defaultValue: CharacterRole.MAIN })
    role: string;

    @Field(() => String)
    description: string;

    @Field(() => [Anime], { nullable: true })
    animes: Anime[];
}
