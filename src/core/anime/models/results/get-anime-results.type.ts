import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Anime } from '../anime.model';

@ObjectType()
export class GetAnimeResultsType extends BaseResultsType {
    @Field(() => Anime, {
        nullable: true,
        description: 'Anime',
    })
    anime: Anime | null;
}
