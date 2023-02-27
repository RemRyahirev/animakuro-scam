import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorStatistics {
    @Field(() => Int, {
        nullable: true,
        description: 'Amount of requests to this author',
    })
    requests?: number;
}
