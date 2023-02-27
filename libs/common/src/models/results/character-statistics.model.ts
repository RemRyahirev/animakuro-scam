import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CharacterStatistics {
    @Field(() => Int, {
        nullable: true,
        description: 'Amount of requests to this character',
    })
    requests?: number;
}
