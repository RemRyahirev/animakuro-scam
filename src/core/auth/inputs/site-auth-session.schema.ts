import { Field, ID, InputType } from 'type-graphql';

@InputType()
class SiteAuthSessionUserInput {
    @Field()
    id: string;
}

@InputType()
export class CreateSiteAuthSessionInput {
    @Field(() => String)
    agent: string;

    @Field(() => String)
    ip: string;

    @Field(() => ID, { nullable: true })
    userId?: string;

    @Field(() => Boolean)
    active: boolean;
}

@InputType()
export class UpdateSiteAuthSessionInput {
    @Field({ nullable: true })
    agent?: string;

    @Field({ nullable: true })
    ip?: string;

    @Field(() => ID, { nullable: true })
    userId?: string;

    @Field({ nullable: true })
    active?: boolean;
}
