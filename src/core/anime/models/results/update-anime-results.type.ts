import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results/base-results.type';
import { Anime } from '../anime.model';

@ObjectType()
export class UpdateAnimeResultsType extends BaseResultsType {
    @Field(() => Anime, {
        nullable: true,
        description: 'Anime',
    })
    anime: Anime | null;
}
