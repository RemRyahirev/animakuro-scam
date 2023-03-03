import { BaseResultsType } from "@app/common/models/results";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
class MarkCollectionDataProps {
    @Field(() => String)
    title: string;
    
    @Field(() => String)
    image_url: string;
}

@ObjectType()
class MarkCollectionDataArgs {
    @Field(() => Number)
    columns: number;
}

@ObjectType()
class MarkCollectionData {
    @Field(() => ID, {
        description: 'UUID of entity'
    })
    attr_id: string;

    @Field(() => MarkCollectionDataProps)
    props: MarkCollectionDataProps;

    @Field(() => MarkCollectionDataArgs)
    args: MarkCollectionDataArgs
}

@ObjectType()
class MarkCollection {
    @Field(() => String, {
        nullable: true,
        description: 'Raw markdown data'
    })
    text?: string;

    @Field(() => [MarkCollectionData], {
        nullable: true,
        description: 'Parsed markdown data'
    })
    data?: MarkCollectionData[];
}

@ObjectType()
export class GetMarkdownCollectionResultsType extends BaseResultsType {
    @Field(() => [MarkCollection])
    markdown_list: MarkCollection[]
}