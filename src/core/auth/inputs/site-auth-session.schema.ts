import { Field, InputType, ID } from 'type-graphql';

@InputType()
class SiteAuthSessionUserInput {
    @Field()
    id = undefined as any as string;
}

@InputType()
export class CreateSiteAuthSessionInput {
    @Field(() => String)
    agent = undefined as any as string;

    @Field(() => String)
    ip = undefined as any as string;

    @Field(() => ID, { nullable: true })
    userId?: string;

    @Field(() => Boolean)
    active = undefined as any as boolean;
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
