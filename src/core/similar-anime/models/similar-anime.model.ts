import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { AnimeApproval } from '../../../common/models/enums';
import { Anime } from '../../anime/models/anime.model';

@ObjectType()
export class SimilarAnime {
    @HideField()
    parent_anime: Anime;

    @HideField()
    parent_anime_id: string;

    @Field(() => Boolean, {
        description: 'Favourite anime',
        defaultValue: false,
    })
    is_favourite?: boolean;

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
