import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { Author } from '../author.model';

@ObjectType()
export class UpdateAuthorResultsType extends BaseResultsType {
    @Field(() => Author, {
        nullable: true,
        description: 'Author',
    })
    author: Author | null;
}
