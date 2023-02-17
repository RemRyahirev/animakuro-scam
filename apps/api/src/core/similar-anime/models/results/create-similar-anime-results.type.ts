import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { SimilarAnime } from '../similar-anime.model';

@ObjectType()
export class CreateSimilarAnimeResultsType extends BaseResultsType {
    @Field(() => SimilarAnime, {
        nullable: true,
        description: 'SimilarAnime',
    })
    similar_anime: SimilarAnime | null;
}
