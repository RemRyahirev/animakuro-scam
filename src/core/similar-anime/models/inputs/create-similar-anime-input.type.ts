import { ArgsType, Field, ID } from '@nestjs/graphql';
import { AnimeApproval } from '../../../../common/models/enums';

@ArgsType()
export class CreateSimilarAnimeAnimeInputType {
    @Field(() => ID, {
        nullable: true,
        description: 'ID of related parent anime',
    })
    parent_anime_id: string;

    @Field(() => [ID], {
        nullable: true,
        description: 'ID of related child anime',
    })
    child_anime_id: string[];

    @Field(() => [AnimeApproval], { nullable: true, defaultValue: null })
    similar_status: AnimeApproval[];
}
