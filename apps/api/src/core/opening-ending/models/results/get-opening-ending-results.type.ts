import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Anime } from '../../../anime/models/anime.model';
import { OpeningEnding } from '../opening-ending.model';

@ObjectType()
export class GetOpeningEndingResultsType extends BaseResultsType {
    @Field(() => OpeningEnding, {
        description: 'Exact opening/ending',
        nullable: true
    })
    opening_ending: (OpeningEnding & { anime: Anime; }) | null;
}
