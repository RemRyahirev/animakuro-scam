import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AnimeRelation } from '../../../common/models/enums';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class RelatingAnime {
    @Field(() => Anime, {
        nullable: true,
        defaultValue: null,
        description: 'Parent anime',
    })
    parent_anime: Anime;

    @Field(() => ID, {
        nullable: true,
        defaultValue: null,
        description: 'Parent anime ID',
    })
    parent_anime_id: string;

    @Field(() => Anime, {
        nullable: true,
        defaultValue: null,
        description: 'Child anime',
    })
    child_anime: Anime;

    @Field(() => ID, {
        nullable: true,
        defaultValue: null,
        description: 'Child anime ID',
    })
    child_anime_id: string;

    @Field(() => AnimeRelation, {
        nullable: true,
        defaultValue: null,
        description: 'Media relation type',
    })
    status: AnimeRelation;
}
