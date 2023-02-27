import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Studio } from '../studio.model';

@ObjectType()
export class DeleteStudioResultsType extends BaseResultsType {
    @Field(() => Studio, {
        nullable: true,
        description: 'Studio',
    })
    studio: Studio | null;
}
