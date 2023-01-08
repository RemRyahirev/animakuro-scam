import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CharacterRole, CharacterType } from '../../../common/models/enums';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class Character {
    @Field(() => ID, {
        description: 'Unique ID of the character',
    })
    id: string;

    @Field(() => String)
    bucket_id: string;

    @Field(() => String, {
        description: 'Name of the character',
    })
    character_name: string;

    @Field(() => CharacterType, {
        defaultValue: CharacterType.PROTAGONIST,
        description: 'Type of the character',
    })
    importance: string;

    @Field(() => CharacterRole, {
        defaultValue: CharacterRole.MAIN,
        description: 'Role of the character',
    })
    role: string;

    @Field(() => String, { description: 'Brief description of the character' })
    description: string;

    @Field(() => [Anime], {
        nullable: true,
        description: 'List of the animes in which the character appears',
    })
    animes: Anime[];
}
