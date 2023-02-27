import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { OpeningEnding } from '../opening-ending.model';

@ObjectType()
export class CreateOpeningEndingResultsType extends BaseResultsType {
    @Field(() => OpeningEnding, {
        description: 'Created opening/ending',
        nullable: true
    })
    opening_ending: OpeningEnding | null;
}
