import { Field, HideField, ObjectType } from '@nestjs/graphql';

import { AnimeRelation } from '@app/common/models/enums';

import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class RelatingAnime {
    @HideField()
    parent_anime: Anime;

    @HideField()
    parent_anime_id: string;

    @Field(() => Anime, {
        nullable: true,
        defaultValue: null,
        description: 'Child anime',
    })
    child_anime: Anime;

    @HideField()
    child_anime_id: string;

    @Field(() => AnimeRelation, {
        nullable: true,
        defaultValue: null,
        description: 'Media relation type',
    })
    status: AnimeRelation;
}
