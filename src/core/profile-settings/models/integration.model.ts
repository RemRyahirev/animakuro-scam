import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('IntegrationType')
@ObjectType('Integration')
export class Integration {
    @Field(() => String)
    name: string;

    @Field(() => String)
    url: string;
}
