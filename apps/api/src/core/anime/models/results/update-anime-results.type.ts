import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Anime } from '../anime.model';

@ObjectType()
export class UpdateAnimeResultsType extends BaseResultsType {
    @Field(() => Anime, {
        nullable: true,
        description: 'Anime',
    })
    anime: Anime | null;
}
