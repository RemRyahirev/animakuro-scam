import { Field, ID, ObjectType } from '@nestjs/graphql';

import { BaseHistoryModel } from '../../user-profile/models/base-history.model';

import { Anime } from './anime.model';

@ObjectType()
export class AnimeHistory extends BaseHistoryModel {
    @Field(() => ID)
    anime_id: string;

    @Field(() => Anime)
    anime?: Anime;

}
