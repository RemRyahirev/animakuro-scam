import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { RelatingAnime } from '../relating-anime.model';

@ObjectType()
export class CreateRelatingAnimeResultsType extends BaseResultsType {
    @Field(() => RelatingAnime, {
        nullable: true,
        description: 'RelatingAnime',
    })
    relating_anime: RelatingAnime | null;
}
