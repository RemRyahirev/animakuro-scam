import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '@app/common/models/results';
import { Anime } from '../../../anime/models/anime.model';

@ObjectType()
export class GetAnimesGenresWithStatisticResultsType extends BaseResultsType {
    @Field(() => [GenreStatistic], {
        nullable: true,
        description: 'genres',
    })
    genres: GenreStatistic[];
}

@ObjectType()
class GenreStatistic {
    @Field(() => ID, {
        description: 'Unique ID of the genre',
    })
    id?: string;

    @Field(() => String, {
        description: 'Name of the genre',
    })
    name: string;

    @Field(() => [Anime], {
        description: 'Animes of this genre',
    })
    animes: Anime[];

    @Field(() => Number, {
        description: 'Animes count',
    })
    count: number;
}
