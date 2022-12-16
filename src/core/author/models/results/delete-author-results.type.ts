import { Field, ObjectType } from 'type-graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Author } from '../author.model';

@ObjectType()
export class DeleteAuthorResultsType extends BaseResultsType {
    @Field(() => Author, {
        nullable: true,
        description: 'Author',
    })
    author: Author | null;
}
