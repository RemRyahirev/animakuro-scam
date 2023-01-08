import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Anime } from '../anime.model';

@ObjectType()
export class DeleteAnimeResultsType extends BaseResultsType {
    @Field(() => Anime, {
        nullable: true,
        description: 'Anime',
    })
    anime: Anime | null;
}
