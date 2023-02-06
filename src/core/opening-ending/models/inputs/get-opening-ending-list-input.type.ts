import { ArgsType, Field } from "@nestjs/graphql";


@ArgsType()
export class GetOpeningEndingListInputType {
    @Field(() => String, {
        description: 'Name of the opening/ending',
        nullable: true
    })
    name?: string;

    @Field(() => String, {
        description: 'Author\'s name',
        nullable: true
    })
    author_name?: string;
}