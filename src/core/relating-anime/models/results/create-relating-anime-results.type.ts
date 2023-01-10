import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { RelatingAnime } from '../relating-anime.model';

@ObjectType()
export class CreateRelatingAnimeResultsType extends BaseResultsType {
    @Field(() => RelatingAnime, {
        nullable: true,
        description: 'RelatingAnime',
    })
    genre: RelatingAnime | null;
}
