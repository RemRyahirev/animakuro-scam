import { Field, ObjectType } from '@nestjs/graphql';

import { BaseResultsType } from '@app/common/models/results';

import { Author } from '../author.model';

@ObjectType()
export class GetAuthorResultsType extends BaseResultsType {
    @Field(() => Author, {
        nullable: true,
        description: 'Author',
    })
    author: Author | null;
}
