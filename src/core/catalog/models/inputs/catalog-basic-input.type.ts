import { ArgsType, Field } from "@nestjs/graphql";
import { IsOptional, IsString, Length } from "class-validator";
import { SortOrder } from "../../../../common/models/enums/sort-order.enum";

@ArgsType()
export class CatalogBasicInputType {
    @IsOptional()
    @IsString()
    @Length(0, 100)
    @Field(() => String, { nullable: true })
    search?: string;

    @IsOptional()
    @IsString()
    @Field(() => SortOrder, { nullable: true })
    sort_order?: SortOrder
}
