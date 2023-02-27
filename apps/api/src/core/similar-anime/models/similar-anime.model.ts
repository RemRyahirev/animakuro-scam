import { Field, HideField, ObjectType } from '@nestjs/graphql';

import { AnimeApproval } from '@app/common/models/enums';

import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class SimilarAnime {
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

    @Field(() => AnimeApproval, {
        nullable: true,
        defaultValue: null,
        description: 'Approval status',
    })
    status: AnimeApproval;
}
