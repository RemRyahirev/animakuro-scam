import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { OpeningEnding } from '../opening-ending.model';

@ObjectType()
export class DeleteOpeningEndingResultsType extends BaseResultsType {
    @Field(() => OpeningEnding, {
        description: 'Deleted opening/ending',
        nullable: true
    })
    opening_ending: OpeningEnding | null;
}
