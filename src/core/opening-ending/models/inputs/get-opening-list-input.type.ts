import { ArgsType, Field } from "@nestjs/graphql";


@ArgsType()
export class GetOpeningListInputType {
    @Field(() => String, {
        description: 'Name of the opening',
        nullable: true
    })
    name?: string;

    @Field(() => String, {
        description: 'Author\'s name',
        nullable: true
    })
    author_name?: string;
}