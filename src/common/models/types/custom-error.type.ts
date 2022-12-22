import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CustomErrorType {
    @Field(() => String, {
        nullable: false,
        description: "Property that didn't pass validation",
    })
    property: string;

    @Field(
        () => String || Number || [String],
        {
            nullable: true,
            description: 'Not valid property value',
        },
    )
    value: any;

    @Field(() => String, {
        nullable: true,
        description: 'Validation message',
    })
    reason: string;
}
