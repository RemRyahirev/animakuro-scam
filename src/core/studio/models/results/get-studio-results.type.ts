import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Studio } from '../studio.model';

@ObjectType()
export class GetStudioResultsType extends BaseResultsType {
    @Field(() => Studio, {
        nullable: true,
        description: 'Genre',
    })
    studio: Studio | null;
}
