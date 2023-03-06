import { ArgsType, Field, ID } from '@nestjs/graphql';

import { AnimeRelation } from '@app/common/models/enums';

@ArgsType()
export class CreateRelatingAnimeArgsType {
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

    @Field(() => [AnimeRelation], { nullable: true, defaultValue: null })
    related_status: AnimeRelation[];
}
