import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileStatistics {
    @Field(() => Int, {
        nullable: true,
        description: 'Amount of requests to this profile',
    })
    requests?: number;
}
