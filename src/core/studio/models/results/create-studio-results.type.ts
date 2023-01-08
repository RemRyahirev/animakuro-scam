import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Studio } from '../studio.model';

@ObjectType()
export class CreateStudioResultsType extends BaseResultsType {
    @Field(() => Studio, {
        nullable: true,
        description: 'Studio',
    })
    studio: Studio | null;
}
